package com.teamg.tourdeshot.core.api.local.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OpeningHoursPostDTO {

    private List<DaySchedulePostDTO> schedule;
}
