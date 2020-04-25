package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.OpeningHoursDTO;
import com.teamg.tourdeshot.core.mapper.utils.MappingProvider;
import com.teamg.tourdeshot.core.mapper.utils.OpeningHoursMapperUtils;
import com.teamg.tourdeshot.core.model.DaySchedule;
import com.teamg.tourdeshot.core.model.OpeningHours;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

@Component
public class OpeningHoursMapperImpl implements OpeningHoursMapper {

    private final DayScheduleMapper dayScheduleMapper;
    private final OpeningHoursMapperUtils mapperUtils;
    private final MappingProvider mappingProvider;

    @Autowired
    public OpeningHoursMapperImpl(DayScheduleMapper dayScheduleMapper, OpeningHoursMapperUtils mapperUtils, @Qualifier("openStatusMappingsProvider") MappingProvider mappingProvider) {
        this.dayScheduleMapper = dayScheduleMapper;
        this.mapperUtils = mapperUtils;
        this.mappingProvider = mappingProvider;
    }

    @Override
    public OpeningHoursDTO toOpeningHoursDTO(OpeningHours openingHours) {
        if(Objects.isNull(openingHours))
            return null;
        LocalDateTime now = LocalDateTime.now();
        DaySchedule daySchedule = mapperUtils.getDayScheduleByDayOfWeek(now.getDayOfWeek(), openingHours.getSchedule());
        return OpeningHoursDTO.builder()
                .schedule(dayScheduleMapper.toDaySchedulerDTOs(openingHours.getSchedule()))
                .openStatus((String) mappingProvider.get(mapperUtils.getOpenStatus(daySchedule.getOpeningTime(), daySchedule.getClosingTime(),
                        LocalTime.of(now.getHour(), now.getMinute()))))
                .presentDayIndex(daySchedule.getOrderNumber())
                .build();
    }
}
