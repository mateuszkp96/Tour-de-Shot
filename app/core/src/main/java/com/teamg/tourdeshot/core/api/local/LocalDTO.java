package com.teamg.tourdeshot.core.api.local;


import com.teamg.tourdeshot.core.model.Address;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Details;
import com.teamg.tourdeshot.core.model.Menu;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class LocalDTO {

    private Long id;

    private String name;

    private Long ownerId;

    private Coordinates coordinates;

    private Address address;

    private Details details;

    private Menu menu;

    private BigDecimal distance;

}
