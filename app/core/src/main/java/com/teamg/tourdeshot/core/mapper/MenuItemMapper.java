package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.MenuItemDTO;
import com.teamg.tourdeshot.core.api.menu.dto.MenuItemPostDTO;
import com.teamg.tourdeshot.core.model.MenuItem;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

public interface MenuItemMapper {

    MenuItemDTO toMenuItemDTO(MenuItem menuItem);

    MenuItem toMenuItem(MenuItemPostDTO menuItem);

    default List<MenuItemDTO> toMenuItemDTOs(List<MenuItem> menuItems) {
        if (Objects.isNull(menuItems))
            return new ArrayList<>();
        return menuItems.stream()
                .map(this::toMenuItemDTO)
                .collect(toList());
    }

    default List<MenuItem> toMenuItem(List<MenuItemPostDTO> items) {
        if (Objects.isNull(items))
            return new ArrayList<>();
        return items.stream()
                .map(this::toMenuItem)
                .collect(toList());
    }
}
