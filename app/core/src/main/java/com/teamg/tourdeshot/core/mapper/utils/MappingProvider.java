package com.teamg.tourdeshot.core.mapper.utils;

public interface MappingProvider<T, U> {
    U get(T value);
}
