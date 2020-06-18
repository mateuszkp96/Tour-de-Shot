package com.teamg.tourdeshot.user.security;

import com.teamg.tourdeshot.user.service.TourOidcUserService;
import com.teamg.tourdeshot.user.userdetails.Oauth2AuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.oidc.web.logout.OidcClientInitiatedLogoutSuccessHandler;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    public Oauth2AuthenticationSuccessHandler oauthSuccessHandler;




    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http
                .oauth2Login()
                .loginPage("/oauth2/authorization/user-app")
                .successHandler(oauthSuccessHandler)
                .userInfoEndpoint()
                .oidcUserService(new TourOidcUserService())
                    .and()
                .and().logout().logoutSuccessUrl("/")
                // RP-initiated logout
                .and().logout().logoutSuccessHandler(oidcLogoutSuccessHandler())
                .and()
                .authorizeRequests()
                    .antMatchers("/logout","/login","/login-error",
                            "/login-verified").permitAll()
                    .antMatchers("/customers").hasRole("USER")
                    .antMatchers("/admin").authenticated();
    }
    @Bean
    public RedirectStrategy getRedirectStrategy() {
        return new DefaultRedirectStrategy();
    }

    @Autowired
    ClientRegistrationRepository clientRegistrationRepository;

    OidcClientInitiatedLogoutSuccessHandler oidcLogoutSuccessHandler() {
        OidcClientInitiatedLogoutSuccessHandler successHandler = new OidcClientInitiatedLogoutSuccessHandler(clientRegistrationRepository);
        successHandler.setPostLogoutRedirectUri(URI.create("http://localhost:8081/"));
        return successHandler;
    }


    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
