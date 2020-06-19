package com.teamg.tourdeshot.userhistory.service.client.local.dto;


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


