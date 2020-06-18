package com.teamg.tourdeshot.core.mapper.filter;

import com.teamg.tourdeshot.core.api.local.filter.ProductName;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class ProductNameInterpreterImpl implements ProductNameInterpreter {

    @Override
    public Criteria getProductNameCriteria(ProductName productName) {
        Criteria criteria = new Criteria();
        if(Objects.nonNull(productName.getName())) {
            criteria.and("menu.items.products.name").is(productName.getName());
        }
        return criteria;
    }
}
