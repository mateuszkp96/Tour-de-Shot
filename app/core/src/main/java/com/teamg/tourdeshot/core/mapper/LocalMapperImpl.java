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
                .ownerId(local.getOwnerId())
                .coordinates(local.getCoordinates())
                .address(local.getAddress())
                .details(local.getDetails())
                .menu(local.getMenu())
                .build();
    }

    @Override
    public Local toLocal(LocalPostDTO localPostDTO) {
        return Local.builder()
                .name(localPostDTO.getName())
                .ownerId(localPostDTO.getOwnerId())
                .coordinates(localPostDTO.getCoordinates())
                .address(localPostDTO.getAddress())
                .details(localPostDTO.getDetails())
                .menu(localPostDTO.getMenu())
                .build();
    }

}
