package com.teamg.tourdeshot.core.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.math.BigDecimal;

@EqualsAndHashCode(callSuper = true)
@Data
public class LocalWithDistance extends Local {

    private BigDecimal distance;
}
