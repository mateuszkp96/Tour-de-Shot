package com.teamg.tourdeshot.core.api.local.filter;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Builder
public class Localization {

    private BigDecimal lat;

    private BigDecimal lon;

    private BigDecimal maxDistance;

}
