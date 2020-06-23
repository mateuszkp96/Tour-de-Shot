package com.teamg.tourdeshot.core.api.local.domain;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class LocalDTO {

    private Long id;

    private String name;

    private CoordinatesDTO coordinates;

    private AddressDTO address;

    private String image;

    private List<String> localCategories;

    private Integer priceCategory;

    private OpeningHoursDTO openingHours;

    private String website;

    private ContactDTO contact;

    private MenuDTO menu;

}
