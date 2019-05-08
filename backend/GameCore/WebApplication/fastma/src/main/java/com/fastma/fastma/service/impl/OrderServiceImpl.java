package com.fastma.fastma.service.impl;

import com.fastma.fastma.dao.BetorderMapper;
import com.fastma.fastma.dao.UserMapper;
import com.fastma.fastma.entity.Betorder;
import com.fastma.fastma.entity.BetorderExample;
import com.fastma.fastma.service.OrderService;
import com.fastma.fastma.service.RaceService;
import com.fastma.fastma.util.JsonUtil;
import com.fastma.fastma.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    BetorderMapper betorderMapper;

    @Autowired
    UserMapper userMapper;

    @Autowired
    RaceService raceService;

    @Autowired
    RedisUtil redisUtil;

    @Override
    public List<Betorder> getAllOrders() {
        BetorderExample ex = new BetorderExample();

        return betorderMapper.selectByExample(ex);
    }

    @Override
    public Betorder getOrderById(int id) {
        return betorderMapper.selectByPrimaryKey(id);
    }

    @Override
    public String insertOrder(Betorder order) {
        boolean isBetting = redisUtil.get("is_betting").equals("1");
        if (!isBetting)
            return JsonUtil.failure("not in betting time");

        int currentGameIt = raceService.getCurrentGame().getIteration();

        order.setIteration(currentGameIt);
        order.setTime(new Date());

        if (betorderMapper.insert(order) > 0)
            return JsonUtil.success("bet success");
        else
            return JsonUtil.success("bet failure");
    }
}
