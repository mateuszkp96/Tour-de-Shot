package com.teamg.tourdeshot.user.userdetails;


import com.teamg.tourdeshot.user.model.UserOAuth2Dto;
import com.teamg.tourdeshot.user.service.UserRegistrationService;
import com.teamg.tourdeshot.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Array;
import java.util.Collections;
import java.util.Enumeration;
import java.util.List;
import java.util.Objects;

@Configuration("oauth2authSuccessHandler")
public class Oauth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    private  final UserService userService;
	private final UserRegistrationService userRegistrationService;
	private final RedirectStrategy redirectStrategy;
	private final String redirectUrl;

	@Autowired
    public Oauth2AuthenticationSuccessHandler(UserService userService,
                                              UserRegistrationService userRegistrationService,
                                              RedirectStrategy redirectStrategy,
                                              @Value("${app.url.redirect}") String redirectUrl) {
        this.userService = userService;
        this.userRegistrationService = userRegistrationService;
        this.redirectStrategy = redirectStrategy;
        this.redirectUrl = Objects.requireNonNullElse(redirectUrl, "http://google.com");
    }


    @Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
		OidcTourUser principal = (OidcTourUser) authentication.getPrincipal();
		if(!this.userService.userCreated(authentication.getName())) {
			UserOAuth2Dto user = new UserOAuth2Dto(principal.getFirstName(), principal.getLastName(), authentication.getName(), principal.getEmail());
			this.userRegistrationService.registerNewAuth2User(user);
		}
		response.addHeader("Authorization", "Bearer "+principal.getIdToken().getTokenValue());
		this.redirectStrategy.sendRedirect(request, response, this.redirectUrl);
	}
}
