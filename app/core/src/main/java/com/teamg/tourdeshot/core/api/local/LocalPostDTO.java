package com.teamg.tourdeshot.core.api.local;


import com.teamg.tourdeshot.core.model.Coordinates;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class LocalPostDTO {

    private String name;

    private Coordinates coordinates;
}
