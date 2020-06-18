package com.teamg.tourdeshot.userhistory.api.dto.history;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CoordinatesDTO {
    private BigDecimal lat;
    private BigDecimal lon;
}
