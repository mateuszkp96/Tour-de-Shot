package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.dto.LocalDTO;
import com.teamg.tourdeshot.core.model.Local;
import java.util.List;
import static java.util.stream.Collectors.toList;

public interface LocalMapper {

    LocalDTO toLocalDTO(Local local);

    default List<LocalDTO> toLocalDTOs(List<Local> locals) {
        return locals.stream()
                .map(this::toLocalDTO)
                .collect(toList());
    }
}
