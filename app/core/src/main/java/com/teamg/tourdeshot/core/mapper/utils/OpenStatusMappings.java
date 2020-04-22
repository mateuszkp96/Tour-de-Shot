package com.teamg.tourdeshot.core.mapper.utils;

import com.teamg.tourdeshot.core.api.local.domain.OpenStatus;
import lombok.AllArgsConstructor;

import java.util.Map;

@AllArgsConstructor
public class OpenStatusMappings implements MappingProvider<OpenStatus, String> {
    private final Map<OpenStatus, String> mappings;

    @Override
    public String get(OpenStatus value) {
        return mappings.get(value);
    }
}
