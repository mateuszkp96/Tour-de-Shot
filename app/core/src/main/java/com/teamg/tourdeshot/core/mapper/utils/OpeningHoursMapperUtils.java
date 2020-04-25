package com.teamg.tourdeshot.core.mapper.utils;

import com.teamg.tourdeshot.core.api.local.domain.OpenStatus;
import com.teamg.tourdeshot.core.model.DaySchedule;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;

@Component
public class OpeningHoursMapperUtils {

    public DaySchedule getDayScheduleByDayOfWeek(DayOfWeek day, List<DaySchedule> schedule) {
        return schedule.stream()
                .filter(daySchedule -> daySchedule.getDayOfWeek().equals(day))
                .findAny().orElse(null);
    }

    public OpenStatus getOpenStatus(LocalTime open, LocalTime close, LocalTime now) {

        if (Objects.nonNull(open) && Objects.nonNull(close)) {
            if (now.isAfter(open) && now.isBefore(close)) {
                if (ChronoUnit.MINUTES.between(now, close) < 15) {
                    return OpenStatus.CLOSING_SOON;
                }
                return OpenStatus.OPEN;
            }
        }
        return OpenStatus.CLOSE;
    }
}
