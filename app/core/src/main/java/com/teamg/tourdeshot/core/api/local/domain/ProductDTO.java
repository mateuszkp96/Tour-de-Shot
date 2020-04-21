package com.teamg.tourdeshot.core.api.local.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
public class ProductDTO {

    private Long productId;

    private String name;

    private BigDecimal price;

    private String description;

    private List<String> ingredients;
}
