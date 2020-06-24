package com.teamg.tourdeshot.user.api;

import com.teamg.tourdeshot.user.model.UserOAuth2Dto;
import com.teamg.tourdeshot.user.service.UserRegistrationService;
import com.teamg.tourdeshot.user.service.UserService;
import com.teamg.tourdeshot.user.userdetails.OidcTourUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/registration")
public class RegistrationController {

    private  final UserService userService;
    private final UserRegistrationService userRegistrationService;

    @Autowired
    public RegistrationController(UserService userService, UserRegistrationService userRegistrationService) {
        this.userService = userService;
        this.userRegistrationService = userRegistrationService;
    }

    @PostMapping
    public ResponseEntity<String> login() {
        JwtAuthenticationToken authentication = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        if(!this.userService.userCreated(authentication.getName())) {
            String firstName = authentication.getTokenAttributes().get("given_name").toString();
            String lastName = authentication.getTokenAttributes().get("family_name").toString();
            String name = authentication.getName();
            String email = authentication.getTokenAttributes().get("email").toString();

            UserOAuth2Dto user = new UserOAuth2Dto(firstName, lastName, name, email);
            this.userRegistrationService.registerNewAuth2User(user);
            return new ResponseEntity<>("created", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("registered", HttpStatus.OK);
    }
}
