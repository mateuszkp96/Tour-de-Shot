package com.teamg.tourdeshot.core.mapper;


import com.teamg.tourdeshot.core.api.productcategory.dto.ProductCategoryDTO;
import com.teamg.tourdeshot.core.mapper.utils.ProductCategoryMapperUtils;
import com.teamg.tourdeshot.core.model.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class ProductCategoryMapperImpl implements ProductCategoryMapper {

    private final ProductCategoryMapperUtils utils;

    @Autowired
    public ProductCategoryMapperImpl(ProductCategoryMapperUtils utils) {
        this.utils = utils;
    }

    @Override
    public ProductCategoryDTO toProductCategoryDTO(ProductCategory productCategory) {
        if(Objects.isNull(productCategory))
            return null;
        ProductCategory parent = productCategory.getParent();
        return ProductCategoryDTO.builder()
                .id(productCategory.getId())
                .name(productCategory.getName())
                .hasChild(utils.hasChild(productCategory))
                .parentId(!Objects.isNull(parent) ? parent.getId() : null)
                .build();
    }

}
