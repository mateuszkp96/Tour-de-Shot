package com.teamg.tourdeshot.user.security;

import com.teamg.tourdeshot.user.service.TourOidcUserService;
import com.teamg.tourdeshot.user.userdetails.Oauth2AuthenticationSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    public Oauth2AuthenticationSuccessHandler oauthSuccessHandler;

    @Autowired
    private KeycloakLogoutHandler logoutHandler;
    @Autowired
    private  AppCorsConfig appCorsConfig;



    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http
            .cors().and()
            .logout().addLogoutHandler(logoutHandler)
            .and()
            .oauth2Login()
            .loginPage("/oauth2/authorization/user-app")
            .successHandler(oauthSuccessHandler)
            .userInfoEndpoint()
            .oidcUserService(new TourOidcUserService())
                .and()
            .and()
            .authorizeRequests()
                .antMatchers("/logout","/login","/login-error",
                        "/login-verified").permitAll()
                .antMatchers("/api/customers").authenticated()
                .antMatchers("/admin").authenticated();
    }
    @Bean
    public RedirectStrategy getRedirectStrategy() {
        return new DefaultRedirectStrategy();
    }


    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(appCorsConfig.getAllowedOrigins());
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
