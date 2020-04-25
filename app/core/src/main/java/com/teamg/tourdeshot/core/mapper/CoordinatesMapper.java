package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.CoordinatesDTO;
import com.teamg.tourdeshot.core.model.Coordinates;

public interface CoordinatesMapper {

    CoordinatesDTO toCoordinatesDTO(Coordinates coordinates);
}
