package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.CoordinatesDTO;
import com.teamg.tourdeshot.core.model.Coordinates;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class CoordinatesMapperImpl implements CoordinatesMapper {

    @Override
    public CoordinatesDTO toCoordinatesDTO(Coordinates coordinates) {
        if(Objects.isNull(coordinates))
            return null;
        return CoordinatesDTO.builder()
                .lat(coordinates.getLat())
                .lon(coordinates.getLon())
                .build();
    }
}
