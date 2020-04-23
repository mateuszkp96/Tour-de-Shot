package com.teamg.tourdeshot.core.config;

import com.teamg.tourdeshot.core.exception.ConfigException;
import com.teamg.tourdeshot.core.mapper.utils.DayOfWeekMappings;
import com.teamg.tourdeshot.core.mapper.utils.MappingProvider;
import com.teamg.tourdeshot.core.api.local.domain.OpenStatus;
import com.teamg.tourdeshot.core.mapper.utils.OpenStatusMappings;
import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.DayOfWeek;
import java.util.AbstractMap;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Configuration
public class EnumMappingsConfig {

    @Bean
    public MappingProvider<DayOfWeek, String> dayOfWeekMappingProvider() {
        Config baseConfig = ConfigFactory.load("app.conf")
                .resolve();
        Map<DayOfWeek, String> mappings = loadEnumMapFromConfigs(baseConfig.getConfigList("app.days"), DayOfWeek.class);
        validateMappingsSize(mappings.size(), DayOfWeek.values().length);
        return new DayOfWeekMappings(mappings);
    }

    @Bean
    public MappingProvider<OpenStatus, String> openStatusMappingsProvider() {
        Config baseConfig = ConfigFactory.load("app.conf")
                .resolve();
        Map<OpenStatus, String> mappings = loadEnumMapFromConfigs(baseConfig.getConfigList("app.openStatuses"), OpenStatus.class);
        validateMappingsSize(mappings.size(), OpenStatus.values().length);
        return new OpenStatusMappings(mappings);
    }

    private <K extends Enum<K>> Map<K, String> loadEnumMapFromConfigs(List<? extends Config> configList, Class<K> clazz) {
        return configList.stream()
                .map(config -> {
                    String day = config.getString("key");
                    String mapping = config.getString("value");
                    return new AbstractMap.SimpleEntry<>(Enum.valueOf(clazz, day), mapping);
                })
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (l, r) -> {
                            throw new IllegalArgumentException("Duplicate keys " + l + "and " + r + ".");
                        },
                        () -> new EnumMap<>(clazz)));
    }

    private void validateMappingsSize(int actual, int expected){
        if (actual != expected){
            throw new ConfigException("Unexpected size of mappings. Expected: [" +expected + "] Actual: [" + actual + "]");
        }
    }


}
