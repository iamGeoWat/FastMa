package com.fastma.fastma.service;

import com.fastma.fastma.entity.Game;
import com.fastma.fastma.entity.Racetrack;

import java.util.List;

public interface RaceService {

    List<Racetrack> getCurrentRaces();

    Game getCurrentGame();
}
