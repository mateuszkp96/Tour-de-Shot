package com.teamg.tourdeshot.core.api.local.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ContactDTO {

    private String phoneNumber;

    private String email;
}
