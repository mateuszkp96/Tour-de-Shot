package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.DayScheduleDTO;
import com.teamg.tourdeshot.core.api.local.domain.DaySchedulePostDTO;
import com.teamg.tourdeshot.core.model.DaySchedule;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

public interface DayScheduleMapper {

    DayScheduleDTO toDayScheduleDTO(DaySchedule daySchedule);

    DaySchedule toDaySchedule(DaySchedulePostDTO daySchedulePostDTO);

    default List<DayScheduleDTO> toDaySchedulerDTOs(List<DaySchedule> daySchedules) {
        if(Objects.isNull(daySchedules))
            return new ArrayList<>();
        return daySchedules.stream()
                .map(this::toDayScheduleDTO)
                .collect(toList());
    }

    default List<DaySchedule> toDaySchedulers(List<DaySchedulePostDTO> daySchedules) {
        if(Objects.isNull(daySchedules))
            return new ArrayList<>();
        return daySchedules.stream()
                .map(this::toDaySchedule)
                .collect(toList());
    }
}
