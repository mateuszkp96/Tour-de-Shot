package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.CoordinatesDTO;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Objects;

@Component
public class CoordinatesMapperImpl implements CoordinatesMapper {

    @Override
    public CoordinatesDTO toCoordinatesDTO(Double[] coordinates) {
        if (Objects.isNull(coordinates) || (coordinates.length == 0))
            return null;
        return CoordinatesDTO.builder()
                .lat(BigDecimal.valueOf(coordinates[0]))
                .lon(BigDecimal.valueOf(coordinates[1]))
                .build();
    }

    @Override
    public Double[] toCoordinates(CoordinatesDTO coordinates) {
        if (Objects.isNull(coordinates) || Objects.isNull(coordinates.getLat()) || Objects.isNull(coordinates.getLon()))
            return new Double[0];
        return new Double[]{coordinates.getLat().doubleValue(), coordinates.getLon().doubleValue()};
    }
}
