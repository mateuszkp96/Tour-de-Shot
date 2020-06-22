package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.OpeningHoursDTO;
import com.teamg.tourdeshot.core.api.local.domain.OpeningHoursPostDTO;
import com.teamg.tourdeshot.core.model.OpeningHours;

import java.time.LocalDateTime;

public interface OpeningHoursMapper {

    OpeningHoursDTO toOpeningHoursDTO(OpeningHours openingHours, LocalDateTime now);

    OpeningHours toOpeningHours(OpeningHoursPostDTO openingHoursPostDTO);
}
