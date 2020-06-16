package com.teamg.tourdeshot.userhistory.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "user_histories")
public class UserHistory {

    @Transient
    public static final String SEQUENCE_NAME = "user_history_sequence";

    @Id
    private String id;

    private String name;

    private String userId;

    private LocalDate timestamp;

    private List<LocalHistory> items;
}
