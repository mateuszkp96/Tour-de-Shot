package com.teamg.tourdeshot.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
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
