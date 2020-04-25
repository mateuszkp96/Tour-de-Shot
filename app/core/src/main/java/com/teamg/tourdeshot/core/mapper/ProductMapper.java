package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.ProductDTO;
import com.teamg.tourdeshot.core.model.Product;

import java.util.List;

import static java.util.stream.Collectors.toList;

public interface ProductMapper {

    ProductDTO toProductDTO(Product product);

    default List<ProductDTO> toProductDTOs(List<Product> products) {
        return products.stream()
                .map(this::toProductDTO)
                .collect(toList());
    }
}
