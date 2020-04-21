package com.teamg.tourdeshot.core.api.local.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AddressDTO {

    private String city;

    private String street;

    private String postCode;
}
