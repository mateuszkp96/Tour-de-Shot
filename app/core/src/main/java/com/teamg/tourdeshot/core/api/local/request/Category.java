package com.teamg.tourdeshot.core.api.local.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Category {

    private String id;

    private BigDecimal price_from;

    private BigDecimal price_to;

}
