package com.teamg.tourdeshot.user.service;

import com.teamg.tourdeshot.user.entity.TourDeShotOauth2User;
import com.teamg.tourdeshot.user.model.UserOAuth2Dto;
import com.teamg.tourdeshot.user.repository.Oauth2UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {

	private final Oauth2UserRepository oauth2Repository;
	


	public void registerNewAuth2User(UserOAuth2Dto userDto) {
		TourDeShotOauth2User user = new TourDeShotOauth2User(userDto.getUsername(),
													 userDto.getEmail());
		oauth2Repository.save(user);
	}
	
}
