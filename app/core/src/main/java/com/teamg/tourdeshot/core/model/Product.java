package com.teamg.tourdeshot.core.model;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class Product {

    private String productName;

    private BigDecimal price;

    private List<Ingredient> ingredients;
}
