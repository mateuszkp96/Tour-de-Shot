package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.LocalDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalPostDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalSimpleDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalUpdateDTO;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.LocalWithDistance;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

public interface LocalMapper {

    LocalDTO toLocalDTO(Local local, LocalDateTime now);

    LocalSimpleDTO toLocalSimpleDTO(Local local, LocalDateTime now);

    LocalSimpleDTO toLocalSimpleDTOFromLocalWithDistance(LocalWithDistance local, LocalDateTime now);

    Local toLocal(LocalPostDTO local, Long id, String ownerId);

    default List<LocalDTO> toLocalDTOs(List<Local> locals, LocalDateTime now) {
        return locals.stream()
                .map(local -> toLocalDTO(local, now))
                .collect(toList());
    }

    default List<LocalSimpleDTO> toLocalSimpleDTOs(List<Local> locals, LocalDateTime now) {
        if(Objects.isNull(locals))
            return new ArrayList<>();
        return locals.stream()
                .map(local -> toLocalSimpleDTO(local, now))
                .collect(toList());
    }

    default List<LocalSimpleDTO> toLocalSimpleDTOsFromLocalWithDistance(List<LocalWithDistance> locals,
                                                                        LocalDateTime now) {
        return locals.stream()
                .map(local -> toLocalSimpleDTOFromLocalWithDistance(local, now))
                .collect(toList());
    }
}
