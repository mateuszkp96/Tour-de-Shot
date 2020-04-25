package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.MenuItemDTO;
import com.teamg.tourdeshot.core.model.MenuItem;

import java.util.List;

import static java.util.stream.Collectors.toList;

public interface MenuItemMapper {

    MenuItemDTO toMenuItemDTO(MenuItem menuItem);

    default List<MenuItemDTO> toMenuItemDTOs(List<MenuItem> menuItems) {
        return menuItems.stream()
                .map(this::toMenuItemDTO)
                .collect(toList());
    }
}
