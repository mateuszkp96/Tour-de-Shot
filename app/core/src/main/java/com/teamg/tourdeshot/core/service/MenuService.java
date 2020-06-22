package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.menu.dto.MenuItemPostDTO;
import com.teamg.tourdeshot.core.api.menu.dto.MenuPostDTO;
import com.teamg.tourdeshot.core.mapper.MenuItemMapper;
import com.teamg.tourdeshot.core.mapper.MenuMapper;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {

    private final MenuRepository menuRepository;
    private final MenuMapper menuMapper;
    private final MenuItemMapper menuItemMapper;

    @Autowired
    public MenuService(MenuRepository menuRepository, MenuMapper menuMapper, MenuItemMapper menuItemMapper) {
        this.menuRepository = menuRepository;
        this.menuMapper = menuMapper;
        this.menuItemMapper = menuItemMapper;
    }

    public Local addMenuToLocal(MenuPostDTO menu, Long localId) {
        return menuRepository.addMenuToLocal(menuMapper.toMenu(menu), localId);
    }

    public Local addSectionToMenu(MenuItemPostDTO menuItem, Long localId) {
        return menuRepository.addSectionToMenu(menuItemMapper.toMenuItem(menuItem), localId);
    }

    public Local updateSection(MenuItemPostDTO menuItem, Long localId) {
        return menuRepository.updateSection(menuItem, localId);
    }

    public Local deleteSection(Long orderNumber, Long localId) {
        return menuRepository.deleteSection(orderNumber, localId);
    }
}
