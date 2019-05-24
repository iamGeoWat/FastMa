import game_controller as gc
import time

if __name__ == '__main__':
    game = gc.GameController()
    while True:
        print('========init game========')
        game.init_game()  # 初始化游戏
        print('========bet time========')
        time.sleep(game.bet_time)  # 下注时间
        print('========start game========')
        game.start_game()  # 开始游戏
        print('========reward time========')
        game.reward()  # 分配奖励
        print('========save game========')
        game.next_iteration()  # 保存游戏状态
        print('========cold time========')
        time.sleep(game.cold_time)  # 冷却时间
        print('========clear game========')
        game.clear_game()  # 重置游戏相关数据