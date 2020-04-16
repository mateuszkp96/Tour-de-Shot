package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {

    private final MenuRepository menuRepository;

    @Autowired
    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public Menu addMenuToLocal(Menu menu, Long localId) {
        return menuRepository.addMenuToLocal(menu, localId);
    }

}
