package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.DayScheduleDTO;
import com.teamg.tourdeshot.core.model.DaySchedule;

import java.util.List;

import static java.util.stream.Collectors.toList;

public interface DayScheduleMapper {

    DayScheduleDTO toDayScheduleDTO(DaySchedule daySchedule);

    default List<DayScheduleDTO> toDaySchedulerDTOs(List<DaySchedule> daySchedules) {
        return daySchedules.stream()
                .map(this::toDayScheduleDTO)
                .collect(toList());
    }
}
