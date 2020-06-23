package com.teamg.tourdeshot.core.api.local.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LocalSimpleDTO {

    private Long id;

    private String name;

    private CoordinatesDTO coordinates;

    private AddressDTO address;

    private BigDecimal distance;

    private String image;

    private OpeningHoursDTO openingHours;

    private List<String> localCategories;

    private Integer priceCategory;

}
