package com.teamg.tourdeshot.core.api.local.filter;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Localization {

    private BigDecimal lat;

    private BigDecimal lon;

    private BigDecimal maxDistance;

}
