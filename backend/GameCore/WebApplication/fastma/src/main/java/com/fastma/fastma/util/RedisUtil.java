package com.fastma.fastma.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

@Component
public class RedisUtil {
    @Autowired
    private JedisPool jedisPool;

    /*
    返回的是json字符串
     */
    public String get(String key) {
        Jedis jedis = jedisPool.getResource();

        String value = jedis.get(key);

        jedis.close();

        return value;
    }

    /*
    将对象转化为json字符串存储
     */
    public void set(String key, Object value) {
        Jedis jedis = jedisPool.getResource();
        if (jedis.exists(key))
            jedis.del(key);

        String valueStr = value instanceof String ? (String)value : JsonUtil.object2JsonStr(value);

        jedis.set(key, valueStr);
//        System.out.println("{" + key + "," + valueStr + "}");

        jedis.close();
    }

    /*
    判断是否存在
     */
    public boolean existsKey(String key) {
        Jedis jedis = jedisPool.getResource();

        boolean isExists = jedis.exists(key);

        jedis.close();

        return isExists;
    }

    /*
    存储定时过期的json字符串(以秒为单位)
     */
    public void setExpire(String key, Object value, int time) {
        Jedis jedis = jedisPool.getResource();
        if (jedis.exists(key))
            jedis.del(key);

        String valueStr = value instanceof String ? (String)value : JsonUtil.object2JsonStr(value);

        jedis.set(key, valueStr);
        jedis.expire(key, time);
//        System.out.println("{" + key + "," + valueStr + "}," + time);

        jedis.close();
    }

    /*
    删除指定key的存储
     */
    public void delete(String key) {
        Jedis jedis = jedisPool.getResource();

        jedis.del(key);

        jedis.close();
    }
}
