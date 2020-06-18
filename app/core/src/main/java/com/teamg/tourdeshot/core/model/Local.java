package com.teamg.tourdeshot.core.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "locals")
public class Local {

    @Transient
    public static final String SEQUENCE_NAME = "locals_sequence";

    @Id
    private Long id;

    private String name;

    private Long ownerId;

    @GeoSpatialIndexed
    private Double[] coordinates;

    private Address address;

    private String image;

    private List<String> localCategories;

    private Integer priceCategory;

    private OpeningHours openingHours;

    private String website;

    private Contact contact;

    private Menu menu;

}
