package com.fastma.fastma.controller;

import com.fastma.fastma.entity.Game;
import com.fastma.fastma.entity.Racetrack;
import com.fastma.fastma.service.RaceService;
import com.fastma.fastma.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RaceController {

    @Autowired
    RaceService raceService;

    @RequestMapping(method = RequestMethod.GET, value = "/racetrack")
    public String getCurrentRaces() {
        List<Racetrack> racetracks = raceService.getCurrentRaces();
        if (racetracks != null)
            return JsonUtil.success("query success", racetracks);
        else
            return JsonUtil.failure("query failure");
    }

    @RequestMapping(method = RequestMethod.GET, value = "/game")
    public String getCurrentGame() {
        Game game = raceService.getCurrentGame();

        if (game != null)
            return JsonUtil.success("query success", game);
        else
            return JsonUtil.failure("query failure");
    }

}
