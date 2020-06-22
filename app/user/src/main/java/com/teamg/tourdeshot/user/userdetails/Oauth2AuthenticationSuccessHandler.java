package com.teamg.tourdeshot.user.userdetails;


import com.teamg.tourdeshot.user.model.UserOAuth2Dto;
import com.teamg.tourdeshot.user.service.UserRegistrationService;
import com.teamg.tourdeshot.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Configuration("oauth2authSuccessHandler")
@RequiredArgsConstructor
public class Oauth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {


    private  final UserService userService;
	private final UserRegistrationService userRegistrationService;
	private final RedirectStrategy redirectStrategy;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
		if(!this.userService.userCreated(authentication.getName())) {
			OidcTourUser principal = (OidcTourUser) authentication.getPrincipal();
			UserOAuth2Dto user = new UserOAuth2Dto(principal.getFirstName(), principal.getLastName(), authentication.getName(), principal.getEmail());
			this.userRegistrationService.registerNewAuth2User(user);
		}
		 this.redirectStrategy.sendRedirect(request, response, "http://34.105.178.183.xip.io/");
	}
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
/**	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		if(!this.portfolioService.userHasAportfolio(authentication.getName())) {
			this.portfolioService.createNewPortfolio(authentication.getName());
			OAuth2AuthenticationToken token = (OAuth2AuthenticationToken)authentication;
			Map<String, Object> attributes = token.getPrincipal().getAttributes();
			String firstname = null, lastname = null, email = null;
			if(token.getAuthorizedClientRegistrationId().equals("facebook")) {
				String name = attributes.get("name").toString();
				firstname = name.split(" ")[0];
				lastname = name.split(" ")[1];
				email = attributes.get("email").toString();
			} else if (token.getPrincipal() instanceof DefaultOidcUser) {	
				DefaultOidcUser oidcToken = (DefaultOidcUser) token.getPrincipal();
				firstname = oidcToken.getGivenName();
				lastname = oidcToken.getFamilyName();
				email = oidcToken.getEmail();
			}
			UserOAuth2Dto user = new UserOAuth2Dto(firstname,lastname,authentication.getName(),email);
			this.userRegistrationService.registerNewAuth2User(user);
		}

		this.redirectStrategy.sendRedirect(request, response, "/portfolio");
	}
**/
}
