package com.teamg.tourdeshot.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private Long productId;

    private ProductCategory productCategory;

    private String name;

    private BigDecimal price;

    private List<String> ingredients;

    private String description;
    
}
