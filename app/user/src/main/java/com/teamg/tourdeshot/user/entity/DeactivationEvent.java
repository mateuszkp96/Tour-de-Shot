package com.teamg.tourdeshot.user.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "deactivation_events")
public class DeactivationEvent {

    @Transient
    public static final String SEQUENCE_NAME = "deactivation_event_sequence";

    @Id
    private Long id;

    private String username;

    private LocalDateTime timestampDeactivationProfile;

}
