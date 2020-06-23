package com.teamg.tourdeshot.user.repository;


import com.teamg.tourdeshot.user.entity.TourDeShotOauth2User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface Oauth2UserRepository extends MongoRepository<TourDeShotOauth2User, Long> {

    boolean existsByUsername(String username);
}
