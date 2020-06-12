package com.teamg.tourdeshot.core.mapper.filter;

import com.teamg.tourdeshot.core.api.local.filter.FilterRequestBody;
import com.teamg.tourdeshot.core.api.local.filter.Localization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class LocalFiltersInterpreterImpl implements LocalFiltersInterpreter {

    private final ProductCategoryFilterInterpreter productCategoryFilterInterpreter;
    private final LocalizationFilterInterpreter localizationFilterInterpreter;
    private final ProductNameInterpreter productNameInterpreter;

    @Autowired
    public LocalFiltersInterpreterImpl(ProductCategoryFilterInterpreter productCategoryFilterInterpreter,
                                       LocalizationFilterInterpreter localizationFilterInterpreter,
                                       ProductNameInterpreter productNameInterpreter) {
        this.productCategoryFilterInterpreter = productCategoryFilterInterpreter;
        this.localizationFilterInterpreter = localizationFilterInterpreter;
        this.productNameInterpreter = productNameInterpreter;
    }

    @Override
    public Criteria criteriaBuilder(FilterRequestBody filterRequestBody) {
        List<Criteria> criteriaForFilter = new ArrayList<>();

        if(Objects.nonNull(filterRequestBody.getFilters().getCategories())) {
            criteriaForFilter.add(productCategoryFilterInterpreter.getProductCategoryCriteria(filterRequestBody.getFilters().getCategories()));
        }
        if(Objects.nonNull(filterRequestBody.getFilters().getProductName())) {
            criteriaForFilter.add(productNameInterpreter.getProductNameCriteria(filterRequestBody.getFilters().getProductName()));
        }

        if(criteriaForFilter.size() != 0)
            return new Criteria().andOperator(criteriaForFilter.toArray(new Criteria[criteriaForFilter.size()]));
        return new Criteria();
    }

    @Override
    public Localization extractLocalizationData(FilterRequestBody filterRequestBody) {
        if(Objects.nonNull(filterRequestBody.getFilters().getLocalization())) {
            return localizationFilterInterpreter.getLocalizationData(filterRequestBody.getFilters().getLocalization());
        }
        return localizationFilterInterpreter.createDefaultLocalizationData();
    }

}
