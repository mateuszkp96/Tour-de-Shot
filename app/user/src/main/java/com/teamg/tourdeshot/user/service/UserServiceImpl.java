package com.teamg.tourdeshot.user.service;

import com.teamg.tourdeshot.user.repository.Oauth2UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final Oauth2UserRepository userRepository;

    @Override
    public boolean userCreated(String username) {
        return this.userRepository.existsByUsername(username);
    }

}
