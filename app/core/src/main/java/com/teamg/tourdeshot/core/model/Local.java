package com.teamg.tourdeshot.core.model;

import lombok.Data;

@Data
public class Local {

    private Long id;

    private String name;

    private Long ownerId;

    private Coordinates coordinates;

    private Address address;

    private Details details;
}
