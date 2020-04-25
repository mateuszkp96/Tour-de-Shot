package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.DayScheduleDTO;
import com.teamg.tourdeshot.core.mapper.utils.MappingProvider;
import com.teamg.tourdeshot.core.model.DaySchedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Component
public class DayScheduleMapperImpl implements DayScheduleMapper {

    private final MappingProvider<DayOfWeek, String> mappingProvider;
    private final DateTimeFormatter formatter;

    @Autowired
    public DayScheduleMapperImpl(MappingProvider<DayOfWeek, String> mappingProvider) {
        this.mappingProvider = mappingProvider;
        this.formatter = DateTimeFormatter.ofPattern("HH:mm");
    }

    @Override
    public DayScheduleDTO toDayScheduleDTO(DaySchedule daySchedule) {
        if(Objects.isNull(daySchedule))
            return null;
        return DayScheduleDTO.builder()
                .orderNumber(daySchedule.getOrderNumber())
                .dayOfWeek(mappingProvider.get(daySchedule.getDayOfWeek()))
                .time(createTimeInterval(daySchedule.getOpeningTime(), daySchedule.getClosingTime()))
                .build();
    }

    private String createTimeInterval(LocalTime open, LocalTime close) {
        if(!Objects.isNull(open) && !Objects.isNull(close))
            return open.format(formatter) + " - " + close.format(formatter);
        return null;
    }

}
