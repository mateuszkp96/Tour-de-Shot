package com.teamg.tourdeshot.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DaySchedule {

    private Integer orderNumber;

    private DayOfWeek dayOfWeek;

    private LocalTime openingTime;

    private LocalTime closingTime;
}
