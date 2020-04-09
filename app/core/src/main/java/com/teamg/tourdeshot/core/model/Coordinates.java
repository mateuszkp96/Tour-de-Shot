package com.teamg.tourdeshot.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coordinates {

    private BigDecimal lat;

    private BigDecimal lon;
}
