package com.teamg.tourdeshot.userhistory.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "histories")
public class History {

    @Transient
    public static final String SEQUENCE_NAME = "history_sequence";

    @Id
    private Long id;

    private String name;

    private String userId;

    private LocalDateTime timestamp;

    private List<HistoryItem> items;
}
