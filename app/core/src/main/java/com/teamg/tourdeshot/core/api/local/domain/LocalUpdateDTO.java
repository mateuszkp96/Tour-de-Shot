package com.teamg.tourdeshot.core.api.local.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class LocalUpdateDTO {

    private String name;

    private CoordinatesDTO coordinates;

    private ContactDTO contact;

    private String image;

    private String website;

    private OpeningHoursPostDTO openingHours;

    private List<String> localCategories;

    private AddressDTO address;

}
