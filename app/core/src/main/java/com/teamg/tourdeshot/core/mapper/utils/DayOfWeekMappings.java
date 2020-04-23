package com.teamg.tourdeshot.core.mapper.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.DayOfWeek;
import java.util.Map;

@Getter
@AllArgsConstructor
public class DayOfWeekMappings implements MappingProvider<DayOfWeek, String> {
    private final Map<DayOfWeek, String> mappings;

    @Override
    public String get(DayOfWeek value) {
        return mappings.get(value);
    }
}
