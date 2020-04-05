package com.teamg.tourdeshot.core.service.calculation;

import com.teamg.tourdeshot.core.model.Coordinates;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class DistanceCalculatorUnitTest {

    @Test
    void testCalculateDistance() {
        Coordinates coordinates1 = new Coordinates(new BigDecimal(0), new BigDecimal(0));
        Coordinates coordinates2 = new Coordinates(new BigDecimal(52.236663), new BigDecimal(21.014656));
        Coordinates coordinates3 = new Coordinates(new BigDecimal(52.236216), new BigDecimal(21.012059));
        assertEquals(0, DistanceCalculator.calculate(coordinates1, coordinates1));
        assertEquals(183.6981384164381, DistanceCalculator.calculate(coordinates2, coordinates3));
    }
}
