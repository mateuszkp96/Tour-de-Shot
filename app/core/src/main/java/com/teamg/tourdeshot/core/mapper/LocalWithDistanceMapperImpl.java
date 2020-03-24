package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.dto.LocalWithDistanceDTO;
import com.teamg.tourdeshot.core.model.LocalWithDistance;
import org.springframework.stereotype.Component;

@Component
public class LocalWithDistanceMapperImpl implements LocalWithDistanceMapper {

    @Override
    public LocalWithDistanceDTO toLocalDistanceDTO(LocalWithDistance localWithDistance) {
        return LocalWithDistanceDTO.builder()
                .id(localWithDistance.getId())
                .build();
    }
}
