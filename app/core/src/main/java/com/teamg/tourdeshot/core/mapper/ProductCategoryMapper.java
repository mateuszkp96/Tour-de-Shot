package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.productcategory.dto.ProductCategoryDTO;
import com.teamg.tourdeshot.core.model.ProductCategory;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

public interface ProductCategoryMapper {

    ProductCategoryDTO toProductCategoryDTO(ProductCategory productCategory);

    default List<ProductCategoryDTO> toProductCategoryDTOs(List<ProductCategory> categories) {
        if(Objects.isNull(categories))
            return new ArrayList<>();
        return categories.stream()
                .map(this::toProductCategoryDTO)
                .collect(toList());
    }
}
