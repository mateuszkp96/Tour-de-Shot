package com.teamg.tourdeshot.core.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {

    public static  <T> List<T> sortedList(List<T> list, Comparator<T> comparator) {
        return list.stream()
                .sorted(comparator)
                .collect(Collectors.toList());
    }
}
