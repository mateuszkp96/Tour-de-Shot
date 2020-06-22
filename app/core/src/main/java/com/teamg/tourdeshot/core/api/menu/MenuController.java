package com.teamg.tourdeshot.core.api.menu;

import com.teamg.tourdeshot.core.api.menu.dto.MenuItemPostDTO;
import com.teamg.tourdeshot.core.api.menu.dto.MenuPostDTO;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/menu")
public class MenuController {

    private final MenuService menuService;

    @Autowired
    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping("/{localId}")
    public Local addMenuToLocal(@RequestBody MenuPostDTO menu, @PathVariable Long localId) {
        return menuService.addMenuToLocal(menu, localId);
    }

    @PostMapping("/section/{localId}")
    public Local addSectionToMenu(@RequestBody MenuItemPostDTO menuItem, @PathVariable Long localId) {
        return menuService.addSectionToMenu(menuItem, localId);
    }

    @PostMapping("/update/{localId}")
    public Local updateSection(@RequestBody MenuItemPostDTO menuItem, @PathVariable Long localId) {
        return menuService.updateSection(menuItem, localId);
    }
}
