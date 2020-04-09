package com.teamg.tourdeshot.core.api.local;


import com.teamg.tourdeshot.core.model.Address;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Details;
import com.teamg.tourdeshot.core.model.Menu;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LocalPostDTO {

    private String name;

    private Long ownerId;

    private Coordinates coordinates;

    private Address address;

    private Details details;

    private Menu menu;
}
