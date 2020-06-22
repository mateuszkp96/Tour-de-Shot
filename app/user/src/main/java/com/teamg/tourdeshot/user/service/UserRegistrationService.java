package com.teamg.tourdeshot.user.service;

import com.teamg.tourdeshot.user.entity.TourDeShotOauth2User;
import com.teamg.tourdeshot.user.model.UserOAuth2Dto;
import com.teamg.tourdeshot.user.repository.Oauth2UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserRegistrationService {

    private final Oauth2UserRepository oauth2Repository;
    private final SequenceGeneratorService generatorService;

    @Autowired
    public UserRegistrationService(Oauth2UserRepository oauth2Repository, SequenceGeneratorService generatorService) {
        this.oauth2Repository = oauth2Repository;
        this.generatorService = generatorService;
    }

    public void registerNewAuth2User(UserOAuth2Dto userDto) {
        TourDeShotOauth2User user = new TourDeShotOauth2User(userDto.getUsername(), userDto.getEmail(), LocalDateTime.now());
        user.setId(generatorService.generateSequence(TourDeShotOauth2User.SEQUENCE_NAME));
        oauth2Repository.save(user);
    }

}
