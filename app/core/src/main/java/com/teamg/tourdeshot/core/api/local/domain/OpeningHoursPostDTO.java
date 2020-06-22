package com.teamg.tourdeshot.core.api.local.domain;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OpeningHoursPostDTO {

    private List<DaySchedulePostDTO> schedule;
}
