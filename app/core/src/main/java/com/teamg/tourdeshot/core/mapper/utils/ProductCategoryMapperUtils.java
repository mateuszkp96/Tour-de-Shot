package com.teamg.tourdeshot.core.mapper.utils;


import com.teamg.tourdeshot.core.model.ProductCategory;
import com.teamg.tourdeshot.core.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ProductCategoryMapperUtils {

    private final ProductCategoryRepository productCategoryRepository;

    @Autowired
    public ProductCategoryMapperUtils(ProductCategoryRepository productCategoryRepository) {
        this.productCategoryRepository = productCategoryRepository;
    }

    public boolean hasChild(ProductCategory productCategory) {
        return productCategoryRepository.existsByParentId(productCategory.getId());
    }
}
