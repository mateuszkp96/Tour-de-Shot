package com.teamg.tourdeshot.core.model;

import lombok.Data;

import java.util.List;

@Data
public class Category {

    private String categoryName;

    private List<Product> products;
}
