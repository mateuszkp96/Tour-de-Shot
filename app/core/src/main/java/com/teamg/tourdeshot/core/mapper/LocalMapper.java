package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.LocalDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalPostDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalSimpleDTO;
import com.teamg.tourdeshot.core.model.Local;

import java.util.List;

import static java.util.stream.Collectors.toList;

public interface LocalMapper {

    LocalDTO toLocalDTO(Local local);

    LocalSimpleDTO toLocalSimpleDTO(Local local);

    Local toLocal(LocalPostDTO localPostDTO);

    default List<LocalDTO> toLocalDTOs(List<Local> locals) {
        return locals.stream()
                .map(this::toLocalDTO)
                .collect(toList());
    }

    default List<LocalSimpleDTO> toLocalSimpleDTOs(List<Local> locals) {
        return locals.stream()
                .map(this::toLocalSimpleDTO)
                .collect(toList());
    }
}
