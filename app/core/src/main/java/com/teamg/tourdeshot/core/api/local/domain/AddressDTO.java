package com.teamg.tourdeshot.core.api.local.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AddressDTO {

    private String city;

    private String street;

    private String postCode;
}
