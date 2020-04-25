package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.OpeningHoursDTO;
import com.teamg.tourdeshot.core.model.OpeningHours;

public interface OpeningHoursMapper {

    OpeningHoursDTO toOpeningHoursDTO(OpeningHours openingHours);
}
