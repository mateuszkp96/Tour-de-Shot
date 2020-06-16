package com.teamg.tourdeshot.userhistory.service.client.local.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Local {
    private Long id;
    private String name;
    private Coordinates coordinates;
    private List<Product> products;
}
