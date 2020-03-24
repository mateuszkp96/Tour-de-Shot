package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.dto.LocalWithDistanceDTO;
import com.teamg.tourdeshot.core.model.LocalWithDistance;
import java.util.List;
import static java.util.stream.Collectors.toList;

public interface LocalWithDistanceMapper {

    LocalWithDistanceDTO toLocalDistanceDTO(LocalWithDistance localWithDistance);

    default List<LocalWithDistanceDTO> toLocalDistanceDTOs(List<LocalWithDistance> localsWithDistance) {
        return localsWithDistance.stream()
                .map(this::toLocalDistanceDTO)
                .collect(toList());
    }
}
