package com.teamg.tourdeshot.core.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "locals")
public class Local {

    @Transient
    public static final String SEQUENCE_NAME = "locals_sequence";

    @Id
    private Long id;

    private String name;

    private Long ownerId;

    private Coordinates coordinates;

    private Address address;

    private Details details;

    private Menu menu;
}
