package com.teamg.tourdeshot.core.api.local.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class DaySchedulePostDTO {

    private int orderNumber;

    private Integer dayOfWeek;

    private String openTime;

    private String closeTime;
}
