package com.teamg.tourdeshot.core.service.calculation;

import com.teamg.tourdeshot.core.model.Coordinates;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class DistanceCalculator {

    public static BigDecimal calculate(Coordinates coordinate1, Coordinates coordinate2) {

        final int R = 6371; // Radius of the earth
        double lat1 = coordinate1.getLat().doubleValue();
        double lat2 = coordinate2.getLat().doubleValue();
        double lon1 = coordinate1.getLon().doubleValue();
        double lon2 = coordinate2.getLon().doubleValue();
        double latDistance = Math.toRadians(lat1 - lat2);
        double lonDistance = Math.toRadians(lon1 - lon2);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(lat1))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        return BigDecimal.valueOf(distance).setScale(0, RoundingMode.HALF_UP);
    }

}
