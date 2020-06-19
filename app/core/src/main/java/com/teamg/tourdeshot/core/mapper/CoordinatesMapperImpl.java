package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.CoordinatesDTO;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Objects;

@Component
public class CoordinatesMapperImpl implements CoordinatesMapper {

    @Override
    public CoordinatesDTO toCoordinatesDTO(Double[] coordinates) {
        if(Objects.isNull(coordinates))
            return null;
        return CoordinatesDTO.builder()
                .lat(BigDecimal.valueOf(coordinates[0]))
                .lon(BigDecimal.valueOf(coordinates[1]))
                .build();
    }
}
