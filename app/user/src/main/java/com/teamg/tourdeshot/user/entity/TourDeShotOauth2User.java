package com.teamg.tourdeshot.user.entity;

import lombok.Data;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import java.time.LocalDateTime;

@Document
@RequiredArgsConstructor
@Data
@ToString
public class TourDeShotOauth2User {

	@Transient
	public static final String SEQUENCE_NAME = "tourDeShotOauth2User_sequence";
	
	@Id
	private Long id;

	@NonNull
	@Indexed(unique=true)
	private final String username;

	@Email
	@NonNull
	private String email;

	@NonNull
	private LocalDateTime timestampAcceptanceRegulations;

}
