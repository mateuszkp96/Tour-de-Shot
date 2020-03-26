package com.teamg.tourdeshot.core.api.local.request;

import com.teamg.tourdeshot.core.TestUtils;
import org.junit.jupiter.api.Test;

import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class DeserializationTest {

    @Test
    public void shouldDeserializeLocalRequestBody() {
        InputStream is = this.getClass().getResourceAsStream("/sampleLocalRequestBody.json");
        FilterRequestBody body = TestUtils.deserializeJackson(is, FilterRequestBody.class);
        assertNotNull(body);
        LocalFilters filters = body.getFilters();
        assertNotNull(filters);
        assertNotNull(filters.getCategories());
        assertNotNull(filters.getLocalAddress());
        assertNotNull(filters.getLocalization());
        assertNotNull(filters.getIngredients());
    }

}