package com.teamg.tourdeshot.core.api.local.domain;

import com.teamg.tourdeshot.core.model.Weekday;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DayScheduleDTO {

    private int orderNumber;

    private Weekday dayOfWeek;

    private String time;
}
