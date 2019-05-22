import redis
from config import Config

pool = redis.ConnectionPool(host='127.0.0.1', port=6379)


def get_redis():
    return redis.Redis(connection_pool=pool)


def read_config(path='config.txt'):
    config = Config()

    with open(path, 'r') as f:
        for line in f.readlines():
            line = line.rstrip('\n')
            if line.startswith('#'):
                continue
            if line != '':
                p_name = line.split('=')[0]
                p_value = line.split('=')[1]

                config.properties[p_name] = p_value

    return config


def get_current_iteration():
    with open('condition.txt', 'r') as f:
        for line in f.readlines():
            line = line.rstrip('\n')
            if line.startswith('iteration'):
                return int(line.split('=')[1])


def add_iteration(new_it):
    with open('condition.txt', 'w') as f:
        f.write('iteration={}'.format(new_it))


if __name__ == '__main__':
    c = get_current_iteration()

    print(c)
