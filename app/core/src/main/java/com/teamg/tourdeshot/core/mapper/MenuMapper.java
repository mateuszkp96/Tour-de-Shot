package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.MenuDTO;
import com.teamg.tourdeshot.core.api.menu.dto.MenuPostDTO;
import com.teamg.tourdeshot.core.model.Menu;

public interface MenuMapper {

    MenuDTO toMenuDTO(Menu menu);

    Menu toMenu(MenuPostDTO menu);
}
