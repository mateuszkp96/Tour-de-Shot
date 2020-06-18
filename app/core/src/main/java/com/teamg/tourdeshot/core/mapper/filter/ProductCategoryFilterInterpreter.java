package com.teamg.tourdeshot.core.mapper.filter;

import com.teamg.tourdeshot.core.api.local.filter.ProductCategory;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;

public interface ProductCategoryFilterInterpreter {

    Criteria getProductCategoryCriteria(List<ProductCategory> productCategoryList);
}
