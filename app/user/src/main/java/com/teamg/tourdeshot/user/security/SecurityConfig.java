package com.teamg.tourdeshot.user.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AppCorsConfig appCorsConfig;

    @Autowired
    public SecurityConfig(AppCorsConfig appCorsConfig) {
        this.appCorsConfig = appCorsConfig;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception
    {
        http
            .cors().and()
            .authorizeRequests()
                .mvcMatchers("/api/registration").permitAll()
                .mvcMatchers("/logout","/login","/login-error", "/login-verified").permitAll()
                .mvcMatchers("/api/deactivation").authenticated()
                .mvcMatchers("/api/customers").authenticated()
                .mvcMatchers("/admin").authenticated()
                .and().oauth2ResourceServer().jwt();
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
