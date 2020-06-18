package com.teamg.tourdeshot.userhistory.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;


@Data
@NoArgsConstructor
@Document(collection = "histories")
public class UserHistory {

    @Transient
    public static final String SEQUENCE_NAME = "userhistory_sequence";

    @Id
    private Long id;

    private String userId;

    private Map<Long, History> histories;
}
