package com.teamg.tourdeshot.core.api.local.filter;

import com.teamg.tourdeshot.core.TestUtils;
import org.junit.jupiter.api.Test;

import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class DeserializationTest {

    @Test
    public void shouldDeserializeLocalRequestBody() {
        InputStream is = this.getClass().getResourceAsStream("/sampleLocalFilterRequestBody.json");
        FilterRequestBody body = TestUtils.deserializeJackson(is, FilterRequestBody.class);
        assertNotNull(body);
        LocalFilters filters = body.getFilters();
        assertNotNull(filters);
        assertNotNull(filters.getCategories());
        assertNotNull(filters.getLocalization());
        assertNotNull(filters.getProductName());
    }

}