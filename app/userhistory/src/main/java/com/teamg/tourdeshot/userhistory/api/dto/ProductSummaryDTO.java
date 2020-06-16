package com.teamg.tourdeshot.userhistory.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductSummaryDTO {
    private String productId;
    private String name;
    private BigDecimal price;
    private Integer quantity;
}
