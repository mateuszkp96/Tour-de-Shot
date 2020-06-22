package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.OpenStatus;
import com.teamg.tourdeshot.core.api.local.domain.OpeningHoursDTO;
import com.teamg.tourdeshot.core.api.local.domain.OpeningHoursPostDTO;
import com.teamg.tourdeshot.core.mapper.utils.MappingProvider;
import com.teamg.tourdeshot.core.mapper.utils.OpeningHoursMapperUtils;
import com.teamg.tourdeshot.core.model.DaySchedule;
import com.teamg.tourdeshot.core.model.OpeningHours;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Objects;

@Component
public class OpeningHoursMapperImpl implements OpeningHoursMapper {

    private final DayScheduleMapper dayScheduleMapper;
    private final MappingProvider<OpenStatus, String> mappingProvider;

    @Autowired
    public OpeningHoursMapperImpl(DayScheduleMapper dayScheduleMapper,
                                  MappingProvider<OpenStatus, String> mappingProvider) {
        this.dayScheduleMapper = dayScheduleMapper;
        this.mappingProvider = mappingProvider;
    }

    @Override
    public OpeningHoursDTO toOpeningHoursDTO(OpeningHours openingHours, LocalDateTime now) {
        if(Objects.isNull(openingHours))
            return null;
        DaySchedule daySchedule = OpeningHoursMapperUtils.getDayScheduleByDayOfWeek(now.getDayOfWeek(), openingHours.getSchedule());
        return OpeningHoursDTO.builder()
                .schedule(dayScheduleMapper.toDaySchedulerDTOs(openingHours.getSchedule()))
                .openStatus(getOpenStatus(daySchedule, now))
                .presentDayIndex(daySchedule.getOrderNumber())
                .build();
    }

    @Override
    public OpeningHours toOpeningHours(OpeningHoursPostDTO openingHoursPostDTO) {
        if(Objects.isNull(openingHoursPostDTO))
            return null;
        return OpeningHours.builder()
                .schedule(dayScheduleMapper.toDaySchedulers(openingHoursPostDTO.getSchedule()))
                .build();
    }

    private String getOpenStatus(DaySchedule daySchedule, LocalDateTime now) {
        return mappingProvider.get(OpeningHoursMapperUtils
                .getOpenStatusByTime(daySchedule.getOpeningTime(), daySchedule.getClosingTime(), now));
    }
}
