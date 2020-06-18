package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.ProductDTO;
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
}
