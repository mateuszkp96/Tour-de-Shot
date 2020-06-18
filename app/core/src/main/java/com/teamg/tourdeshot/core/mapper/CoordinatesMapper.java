package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.CoordinatesDTO;

public interface CoordinatesMapper {

    CoordinatesDTO toCoordinatesDTO(Double[] coordinates);
}
