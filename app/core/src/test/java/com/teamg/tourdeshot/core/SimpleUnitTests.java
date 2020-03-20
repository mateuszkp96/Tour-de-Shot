package com.teamg.tourdeshot.core;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class SimpleUnitTests {

    @Test
    public void testAddition() {
        assertEquals(4, 2 + 2);
    }

    @Test
    public void testDivision() {
        assertEquals(2, 4 / 2);
    }

    @Test
    void exceptionTest() {
        assertThrows(NumberFormatException.class, () -> {
            Integer.parseInt("One");
        });
    }

}
