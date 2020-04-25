package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.MenuDTO;
import com.teamg.tourdeshot.core.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class MenuMapperImpl implements MenuMapper {

    private final MenuItemMapper menuItemMapper;

    @Autowired
    public MenuMapperImpl(MenuItemMapper menuItemMapper) {
        this.menuItemMapper = menuItemMapper;
    }

    @Override
    public MenuDTO toMenuDTO(Menu menu) {
        if(Objects.isNull(menu))
            return null;
        return MenuDTO.builder()
                .menuHeader(menu.getMenuHeader())
                .items(menuItemMapper.toMenuItemDTOs(menu.getItems()))
                .build();
    }
}
