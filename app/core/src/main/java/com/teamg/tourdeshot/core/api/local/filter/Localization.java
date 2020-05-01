package com.teamg.tourdeshot.core.api.local.filter;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Localization {

    private BigDecimal lat;

    private BigDecimal lon;

    private BigDecimal maxDistance;

}
