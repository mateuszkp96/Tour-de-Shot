package com.teamg.tourdeshot.core.mapper.filter;

import com.teamg.tourdeshot.core.api.local.filter.FilterRequestBody;
import com.teamg.tourdeshot.core.api.local.filter.Localization;
import org.springframework.data.mongodb.core.query.Criteria;

public interface LocalFiltersInterpreter {

    Criteria criteriaBuilder(FilterRequestBody filterRequestBody);

    Localization extractLocalizationData(FilterRequestBody filterRequestBody);
}
