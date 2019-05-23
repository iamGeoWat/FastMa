from util import get_redis, read_config, get_current_iteration, add_iteration
from db_connector import models
import urllib.request as ur
import requests
import json
import datetime
import time
import operator

config = read_config()


class GameController:

    def __init__(self):
        self.s_url = config.properties['source_url']
        self.t_url = config.properties['token_url']
        self.cold_time = int(config.properties['cold_time'])
        self.racetracks = [0] * int(config.properties['racetrack_quantity'])
        self.token_dict = self.get_token()
        self.game_condition = models.Game(it=get_current_iteration(),
                                          track_row=config.properties['racetrack_quantity'])
        # self.iteration = get_current_iteration()
        self.bet_time = int(config.properties['betting_time'])

    """
    更新游戏状态，在数据库中插入游戏
    """
    def init_game(self):
        self.game_condition.iteration = get_current_iteration()
        self.game_condition.insert()
        get_redis().set('is_betting', 1)
        get_redis().set('iteration', self.game_condition.iteration)

    """
    开始一轮游戏
    """
    def start_game(self):
        redis = get_redis()

        # 比赛开始
        flag = 1
        redis.set('is_betting', 0)
        redis.set('is_gaming', 1)
        wins = []
        time.sleep(1)
        while flag == 1:
            # 获取赛马进度
            block, block_time = self.get_block_id()
            digit_list = list(filter(lambda x: str.isdigit(x) and x != '0', block['id']))
            while len(digit_list) < int(config.properties['racetrack_quantity']):
                bid = self.get_block_id()
                digit_list = list(filter(lambda x: str.isdigit(x) and x != '0', bid))

            digit_list = digit_list[:int(config.properties['racetrack_quantity'])]

            # 马跑动
            for i, dis in enumerate(digit_list):
                self.racetracks[i] += int(dis)
            print(self.racetracks)
            redis.set('distances', json.dumps(self.racetracks))

            # 将获取到的blockid插入到数据库中保存
            py_datetime = datetime.datetime.strptime(block_time, "%Y-%m-%dT%H:%M:%S.%fZ")
            new_block = models.BlockId(bid=block['id'], t=py_datetime)
            new_block.insert()

            # 判断是否有马胜出
            cross_lines = []
            for i, distance in enumerate(self.racetracks):
                if distance >= int(config.properties['win_distance']):
                    cross_lines.append({'id': i, 'dis': distance})

            if len(cross_lines) > 0:
                # 若有多匹马冲线，则选择跑出距离最远的，若有与第一名相同距离的都加入到wins列表中，视为共同胜出
                if len(cross_lines) > 1:
                    cross_lines = sorted(cross_lines, key=operator.itemgetter('dis'), reverse=True)
                    wins.append(cross_lines[0]['id'])
                    ii = 1
                    while cross_lines[ii]['dis'] == cross_lines[0]['dis']:
                        wins.append(cross_lines[ii]['id'])
                        ii += 1
                else:
                    wins.append(cross_lines[0])
                flag = 0
            else:
                time.sleep(1)

        wins_id = [wins[0]['id']]
        if len(wins) > 1:
            for i in wins:
                wins_id.append(i['id'])
        redis.set('track_win', json.dumps(wins_id))

        race_list = json.loads(get_redis().get('racetracks'))

        # 将赛道结果保存至数据库
        tracks = [models.RaceTrack()] * int(config.properties['racetrack_quantity'])
        for i, race_d in enumerate(self.racetracks):
            tracks[i].race_distance = race_d
            tracks[i].if_win = 1 if i in wins else 0
            tracks[i].iteration = self.game_condition.iteration
            tracks[i].stake_token = race_list[i]['total_token']
            tracks[i].which_track = i + 1
            tracks[i].insert()

        redis.set('is_gaming', 0)

    """
    分配奖励
    """
    def reward(self):
        race_list = json.loads(get_redis().get('racetracks'))['racetracks']
        r_win = json.loads(get_redis().get('track_win'))

        # 获取整场游戏的总token数、总参与人数以及赢家输家的总token数
        token_lost = 0
        token_win = 0
        for i, race in enumerate(race_list):
            self.game_condition.total_volume += race['total_token']
            self.game_condition.user_count += len(race['user_orders'])
            if i in r_win:
                token_win += race['total_token']
                continue
            token_lost += race['total_token']

        user_win_orders = race_list[r_win[0]]['user_orders']
        # 若出现平局，需要将胜出赛道的betorder信息合并
        if len(r_win) > 1:
            for i, wi in enumerate(r_win):
                if i == 0:
                    continue
                for user_orders in race_list[wi]['user_orders']:
                    f = 0
                    for order in user_win_orders:
                        if order['userid'] == user_orders['userid']:
                            order['bet'] += user_orders['bet']
                            f = 1
                    if f == 0:
                        user_win_orders.append(user_orders)

        for user in user_win_orders:
            n_user = models.User(user['userid'])
            # 计算赢家获得的token
            received = token_lost * (user['bet'] / token_win) * (1 - config.properties['cut'])
            n_user.add_bet(received)

    """
    保存游戏状态到数据库，并更新condition.txt文件
    """
    def next_iteration(self):
        self.game_condition.insert()
        next_i = self.game_condition.iteration + 1
        add_iteration(next_i)

    """
    从指定的接口获取一个block_id
    """
    def get_block_id(self):
        now_time = time.time()
        if now_time >= self.token_dict['expires_at']:
            self.token_dict = self.get_token()

        # utc = datetime.datetime.fromtimestamp(now_time)
        utc = datetime.datetime.utcfromtimestamp(now_time)
        iso_time = datetime.datetime.strftime(utc, "%Y-%m-%dT%H:%M:%S.%fZ")

        headers = {"Authorization": 'Bearer {}'.format(self.token_dict['token'])}
        param = {'time': iso_time, 'comparator': 'lte'}
        response = requests.get(self.s_url, params=param, headers=headers)

        if response.json()['block']:
            return response.json()['block'], iso_time
        else:
            raise RuntimeError(response.json()['code'])

    """
    从指定的接口获取token
    """
    def get_token(self):
        raw = {'api_key': 'server_9bbaf4df9fc8f45287736a6e0587a804'}
        data = json.dumps(raw)
        data = bytes(data, 'utf-8')
        headers = {'Content-Type': 'application/json'}
        request = ur.Request(self.t_url, headers=headers, data=data)
        response = ur.urlopen(request)
        res = response.read().decode('utf-8')

        return json.loads(res)


if __name__ == '__main__':
    # now = datetime.datetime.utcnow()
    # print(now)
    ga = GameController()
    ga.start_game()
    # print(game.token_dict['token'])
    # bl = ga.get_block_id()
    # print(bl)
    # print(bl['time'])
    # print(bl['id'])
    # time = datetime.datetime.strptime(bl['time'], "%Y-%m-%dT%H:%M:%SZ")
    # print(time)
    # new_block = models.BlockId(bid=bl['id'], t=time)
    # new_block.insert()

    # r = get_redis()
    # r.set('racetracks', str([0, 1, 0, 0, 0, 0, 0, 0]))
    #
    # l = json.loads(str(r.get('racetracks'), encoding='utf-8'))
    # print(l[0])

    # print(config.properties)

    # t = game.token_dict
    # now = time.time()
    # ex_time = t['expires_at']
    #
    # print(ex_time - now)
    # now_time = time.time()
    # utc = datetime.datetime.utcfromtimestamp(now_time)
    # now = datetime.datetime.strftime(utc, "%Y-%m-%dT%H:%M:%S.%fZ")
    # print(now)

    # session = DBSession()
    # session.query(models.BetOrder).filter(models.BetOrder.iteration == 3).all()

    # n_user = models.User(2)
    # n_user.add_bet(1000)
