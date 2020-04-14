package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;

public interface MenuRepository {

    Local addMenuToLocal(Menu menu, Long localId);
}
