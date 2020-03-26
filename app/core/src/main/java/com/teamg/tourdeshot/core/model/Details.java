package com.teamg.tourdeshot.core.model;

import lombok.Data;

import java.util.List;

@Data
public class Details {

    private String email;

    private String phoneNumber;

    private List<OpeningHours> openingHoursList;

    private List<Category> categories;
}
