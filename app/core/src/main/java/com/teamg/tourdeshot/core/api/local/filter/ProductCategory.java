package com.teamg.tourdeshot.core.api.local.filter;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductCategory {

    private String id;

    private BigDecimal priceFrom;

    private BigDecimal priceTo;

}
