package com.teamg.tourdeshot.core.api.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductPostDTO {

    private Long categoryId;

    private String name;

    private BigDecimal price;

    private List<String> ingredients;

    private String description;
}
