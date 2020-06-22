package com.teamg.tourdeshot.core.api.local.domain;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class DaySchedulePostDTO {

    private Integer orderNumber;

    private Integer dayOfWeek;

    private String openTime;

    private String closeTime;
}
