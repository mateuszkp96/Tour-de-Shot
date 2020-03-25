package com.teamg.tourdeshot.core;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;

public class TestUtils {

    public static <T> T deserializeJackson(InputStream is, Class<T> valueType) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(is, valueType);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
