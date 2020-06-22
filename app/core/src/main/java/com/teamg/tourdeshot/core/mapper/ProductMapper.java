package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.ProductDTO;
import com.teamg.tourdeshot.core.api.product.dto.ProductPostDTO;
import com.teamg.tourdeshot.core.model.Product;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

public interface ProductMapper {

    ProductDTO toProductDTO(Product product);

    Product toProduct(ProductPostDTO productPostDTO);

    default List<ProductDTO> toProductDTOs(List<Product> products) {
        if (Objects.isNull(products))
            return new ArrayList<>();
        return products.stream()
                .map(this::toProductDTO)
                .collect(toList());
    }

    default List<Product> toProducts(List<ProductPostDTO> products) {
        if (Objects.isNull(products))
            return new ArrayList<>();
        return products.stream()
                .map(this::toProduct)
                .collect(toList());
    }
}
