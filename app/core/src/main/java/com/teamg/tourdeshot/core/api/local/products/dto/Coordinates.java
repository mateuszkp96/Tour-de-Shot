package com.teamg.tourdeshot.core.api.local.products.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coordinates {
    private BigDecimal lat;
    private BigDecimal lon;
}


