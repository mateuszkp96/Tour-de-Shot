package com.teamg.tourdeshot.core.mapper.utils;

import com.teamg.tourdeshot.core.api.local.domain.OpenStatus;
import com.teamg.tourdeshot.core.model.DaySchedule;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

public class OpeningHoursMapperUtils {

    public static DaySchedule getDayScheduleByDayOfWeek(DayOfWeek day, List<DaySchedule> schedule) {
        return schedule.stream()
                .filter(daySchedule -> daySchedule.getDayOfWeek().equals(day))
                .findAny().orElse(null);
    }

    public static OpenStatus getOpenStatusByTime(LocalTime open, LocalTime close, LocalDateTime currentDateTime) {
        LocalTime now = currentDateTime.toLocalTime();
        if (Objects.nonNull(open) && Objects.nonNull(close)) {
            if(now.getHour() - close.getHour() < 12) {
                if (now.isAfter(open) && now.isBefore(close)) {
                    if (ChronoUnit.MINUTES.between(now, close) < 60) {
                        return OpenStatus.CLOSING_SOON;
                    }
                    return OpenStatus.OPEN;
                }
            } else {
                if(now.isAfter(open)) {
                    return OpenStatus.OPEN;
                }
            }
        }
        return OpenStatus.CLOSE;
    }
}
