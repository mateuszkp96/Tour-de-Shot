package com.teamg.tourdeshot.core.api.local.filter;

import lombok.Data;

import java.util.List;

@Data
public class LocalFilters {

    private List<ProductCategory> categories;

    private Localization localization;

    private ProductName productName;

}
