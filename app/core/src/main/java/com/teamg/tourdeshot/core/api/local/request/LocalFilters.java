package com.teamg.tourdeshot.core.api.local.request;

import lombok.Data;

import java.util.List;

@Data
public class LocalFilters {

    private List<Category> categories;

    private Localization localization;

    private LocalAddress localAddress;

    private LocalName localName;

    private List<Ingredient> ingredients;

}
