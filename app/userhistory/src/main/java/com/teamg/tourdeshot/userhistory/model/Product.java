package com.teamg.tourdeshot.userhistory.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private String productId;

    private String productName;

    private BigDecimal price;

    private BigDecimal quantity;
}
