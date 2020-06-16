package com.teamg.tourdeshot.core.api.local.products.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LocalProductsDTO {
    private Long id;
    private String name;
    private Coordinates coordinates;
    private List<Product> products;
}
