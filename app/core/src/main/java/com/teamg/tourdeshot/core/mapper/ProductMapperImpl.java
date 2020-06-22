package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.ProductDTO;
import com.teamg.tourdeshot.core.api.product.dto.ProductPostDTO;
import com.teamg.tourdeshot.core.model.Product;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toProductDTO(Product product) {
        if (Objects.isNull(product))
            return null;
        return ProductDTO.builder()
                .productId(product.getProductId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .ingredients(product.getIngredients())
                .build();
    }

    @Override
    public Product toProduct(ProductPostDTO productPostDTO) {
        if (Objects.isNull(productPostDTO))
            return null;
        return Product.builder()
                .price(productPostDTO.getPrice())
                .name(productPostDTO.getName())
                .ingredients(productPostDTO.getIngredients())
                .description(productPostDTO.getDescription())
                .build();
    }
}
