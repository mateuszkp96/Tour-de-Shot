package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.Menu;

public interface MenuRepository {

    Menu addMenuToLocal(Menu menu, Long localId);
}
