package com.teamg.tourdeshot.core.api.local.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MenuItemDTO {

    private Integer orderNumber;

    private String categoryHeader;

    List<ProductDTO> products;
}
