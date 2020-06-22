package com.teamg.tourdeshot.core.api.menu;

import com.teamg.tourdeshot.core.api.menu.dto.MenuItemPostDTO;
import com.teamg.tourdeshot.core.api.menu.dto.MenuPostDTO;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/section/{localId}")
    public Local updateSection(@RequestBody MenuItemPostDTO menuItem, @PathVariable Long localId) {
        return menuService.updateSection(menuItem, localId);
    }

    @DeleteMapping("/{localId}")
    public Local deleteSection(@PathVariable Long localId, @RequestParam Long orderNumber) {
        return menuService.deleteSection(orderNumber, localId);
    }
}
