package com.teamg.tourdeshot.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "productCategories")
public class ProductCategory {

    @Transient
    public static final String PRODUCT_CATEGORIES_SEQUENCE_NAME = "product_categories_sequence";

    private Long id;

    private String name;

    private ProductCategory parent;

}
