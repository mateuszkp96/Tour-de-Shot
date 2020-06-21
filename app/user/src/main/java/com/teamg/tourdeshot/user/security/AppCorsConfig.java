package com.teamg.tourdeshot.user.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "app.cors", ignoreUnknownFields = false)
public class AppCorsConfig {
    private final List<String> allowedOrigins = new ArrayList<>();
}
