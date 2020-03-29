package com.teamg.tourdeshot.core.api.local;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class LocalDTO {

    private Long id;

    private String name;

}
