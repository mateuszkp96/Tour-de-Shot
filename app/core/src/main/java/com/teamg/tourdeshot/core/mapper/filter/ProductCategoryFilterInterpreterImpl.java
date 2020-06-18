package com.teamg.tourdeshot.core.mapper.filter;

import com.teamg.tourdeshot.core.api.local.filter.ProductCategory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class ProductCategoryFilterInterpreterImpl implements ProductCategoryFilterInterpreter {

    private Double defaultMinPrice;
    private Double defaultMaxPrice;

    public ProductCategoryFilterInterpreterImpl(@Value("${app.categoryFilter.minPrice}") Double defaultMinPrice,
                                                @Value("${app.categoryFilter.maxPrice}") Double defaultMaxPrice) {
        this.defaultMinPrice = Objects.requireNonNullElse(defaultMinPrice, 0.0);;
        this.defaultMaxPrice = Objects.requireNonNullElse(defaultMaxPrice, 1000.0);;
    }

    @Override
    public Criteria getProductCategoryCriteria(List<ProductCategory> productCategoryList) {
        List<Criteria> criteriaList = new ArrayList<>();
        productCategoryList
                .forEach(productCategory -> {
                    if (Objects.nonNull(productCategory.getId())) {
                        Criteria nameCriteria = Criteria.where("menu.items.products.productCategory.name").is(productCategory.getId());
//                        Criteria priceCriteria = Criteria.where("menu.items.products.price")
//                                .gte(checkFromPrice(productCategory))
//                                .lte(checkToPrice(productCategory));
                        criteriaList.add( new Criteria().andOperator(nameCriteria));
                    }
                });

        return new Criteria().andOperator(criteriaList.toArray(new Criteria[criteriaList.size()]));
    }

    private Double checkFromPrice(ProductCategory productCategory) {
        if (Objects.isNull(productCategory.getPriceFrom())) {
            return defaultMinPrice;
        } else {
            if(productCategory.getPriceFrom() < 0) {
                return defaultMinPrice;
            }
            return productCategory.getPriceFrom();
        }
    }

    private Double checkToPrice(ProductCategory productCategory) {
        if (Objects.isNull(productCategory.getPriceTo())) {
            return defaultMaxPrice;
        } else {
            if((productCategory.getPriceTo() < 0)
                    || (productCategory.getPriceTo() < checkFromPrice(productCategory))) {
                return defaultMaxPrice;
            }
            return productCategory.getPriceTo();
        }
    }
}
