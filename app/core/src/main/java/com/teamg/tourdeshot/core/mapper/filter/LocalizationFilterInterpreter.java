package com.teamg.tourdeshot.core.mapper.filter;

import com.teamg.tourdeshot.core.api.local.filter.Localization;

public interface LocalizationFilterInterpreter {

    Localization getLocalizationData(Localization localization);

    Localization createDefaultLocalizationData();
}
