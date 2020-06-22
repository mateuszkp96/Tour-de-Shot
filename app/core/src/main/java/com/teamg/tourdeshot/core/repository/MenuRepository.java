package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.api.menu.dto.MenuItemPostDTO;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.model.MenuItem;

public interface MenuRepository {

    Local addMenuToLocal(Menu menu, Long localId);

    Local addSectionToMenu(MenuItem menuItem, Long localId);

    Local updateSection(MenuItemPostDTO toMenuItem, Long localId);

    Local deleteSection(Long orderNumber, Long localId);
}
