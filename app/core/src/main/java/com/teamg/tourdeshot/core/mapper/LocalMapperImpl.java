package com.teamg.tourdeshot.core.mapper;


import com.teamg.tourdeshot.core.api.local.LocalDTO;
import com.teamg.tourdeshot.core.api.local.LocalPostDTO;
import com.teamg.tourdeshot.core.model.Local;
import org.springframework.stereotype.Component;

@Component
public class  LocalMapperImpl implements LocalMapper {

    @Override
    public LocalDTO toLocalDTO(Local local) {
        return LocalDTO.builder()
                .id(local.getId())
                .name(local.getName())
                .coordinates(local.getCoordinates())
                .build();
    }

    @Override
    public Local toLocal(LocalPostDTO localPostDTO) {
        return Local.builder()
                .name(localPostDTO.getName())
                .coordinates(localPostDTO.getCoordinates())
                .build();
    }

}
