package com.teamg.tourdeshot.core.mapper.filter;

import com.teamg.tourdeshot.core.api.local.filter.ProductName;
import org.springframework.data.mongodb.core.query.Criteria;

public interface ProductNameInterpreter {

    Criteria getProductNameCriteria(ProductName productName);
}
