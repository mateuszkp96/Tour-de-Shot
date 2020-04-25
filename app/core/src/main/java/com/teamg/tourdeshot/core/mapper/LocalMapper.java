package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.LocalDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalSimpleDTO;
import com.teamg.tourdeshot.core.model.Local;

import java.time.LocalDateTime;
import java.util.List;

import static java.util.stream.Collectors.toList;

public interface LocalMapper {

    LocalDTO toLocalDTO(Local local, LocalDateTime now);

    LocalSimpleDTO toLocalSimpleDTO(Local local, LocalDateTime now);

    default List<LocalDTO> toLocalDTOs(List<Local> locals, LocalDateTime now) {
        return locals.stream()
                .map(local -> toLocalDTO(local, now))
                .collect(toList());
    }

    default List<LocalSimpleDTO> toLocalSimpleDTOs(List<Local> locals, LocalDateTime now) {
        return locals.stream()
                .map(local -> toLocalSimpleDTO(local, now))
                .collect(toList());
    }
}
