package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.productcategory.dto.ProductCategoryDTO;
import com.teamg.tourdeshot.core.model.ProductCategory;

import java.util.List;

import static java.util.stream.Collectors.toList;

public interface ProductCategoryMapper {

    ProductCategoryDTO toProductCategoryDTO(ProductCategory productCategory);

    default List<ProductCategoryDTO> toProductCategoryDTOs(List<ProductCategory> categories) {
        return categories.stream()
                .map(this::toProductCategoryDTO)
                .collect(toList());
    }
}
