package com.teamg.tourdeshot.core.mapper;


import com.teamg.tourdeshot.core.api.local.domain.LocalDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalSimpleDTO;
import com.teamg.tourdeshot.core.model.Local;
import org.springframework.stereotype.Component;

@Component
public class  LocalMapperImpl implements LocalMapper {

    @Override
    public LocalDTO toLocalDTO(Local local) {
        return LocalDTO.builder()
                .id(local.getId())
                .name(local.getName())
                .build();
    }

    @Override
    public LocalSimpleDTO toLocalSimpleDTO(Local local) {
        return LocalSimpleDTO.builder()
                .id(local.getId())
                .name(local.getName())
                .build();
    }

}
