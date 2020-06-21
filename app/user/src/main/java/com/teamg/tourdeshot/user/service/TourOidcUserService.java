package com.teamg.tourdeshot.user.service;


import com.teamg.tourdeshot.user.userdetails.OidcTourUser;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

public class TourOidcUserService extends OidcUserService {
	
	final OidcUserService delegate = new OidcUserService();
	
	@Override
	public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
		OidcTourUser user = new OidcTourUser(super.loadUser(userRequest));
		return user;
	}
	
}
