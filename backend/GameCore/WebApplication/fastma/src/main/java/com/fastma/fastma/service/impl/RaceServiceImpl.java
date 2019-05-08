package com.fastma.fastma.service.impl;

import com.fastma.fastma.dao.RacetrackMapper;
import com.fastma.fastma.entity.Game;
import com.fastma.fastma.entity.Racetrack;
import com.fastma.fastma.entity.RacetrackExample;
import com.fastma.fastma.service.RaceService;
import com.fastma.fastma.util.JsonUtil;
import com.fastma.fastma.util.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RaceServiceImpl implements RaceService {
    @Autowired
    RedisUtil redisUtil;

    @Autowired
    RacetrackMapper racetrackMapper;

    @Override
    public List<Racetrack> getCurrentRaces() {
        int it = getCurrentGame().getIteration();
        RacetrackExample ex = new RacetrackExample();

        ex.createCriteria().andIterationEqualTo(it);
        return racetrackMapper.selectByExample(ex);
    }

    @Override
    public Game getCurrentGame() {
        return JsonUtil.json2Object(redisUtil.get("current_game"), Game.class);
    }
}
