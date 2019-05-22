import game_controller as gc
import time

if __name__ == '__main__':
    game = gc.GameController()
    while True:
        game.init_game()  # 初始化游戏
        time.sleep(game.bet_time)  # 下注时间
        game.start_game()  # 开始游戏
        game.reward()  # 分配奖励
        time.sleep(game.cold_time)  # 冷却时间
        game.next_iteration()  # 保存游戏状态
