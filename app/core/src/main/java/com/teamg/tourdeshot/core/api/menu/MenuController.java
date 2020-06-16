package com.teamg.tourdeshot.core.api.menu;

import com.teamg.tourdeshot.core.model.Menu;
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

    @PostMapping
    public Menu addMenuToLocal(@RequestBody Menu menu, @RequestParam Long localId) {
        return menuService.addMenuToLocal(menu, localId);
    }
}
