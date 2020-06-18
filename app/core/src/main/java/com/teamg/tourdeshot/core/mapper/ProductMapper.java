package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.ProductDTO;
import com.teamg.tourdeshot.core.api.product.dto.ProductPostDTO;
import com.teamg.tourdeshot.core.model.Product;

import java.util.List;

import static java.util.stream.Collectors.toList;

public interface ProductMapper {

    ProductDTO toProductDTO(Product product);

    Product toProduct(ProductPostDTO productPostDTO);

    default List<ProductDTO> toProductDTOs(List<Product> products) {
        return products.stream()
                .map(this::toProductDTO)
                .collect(toList());
    }
}
