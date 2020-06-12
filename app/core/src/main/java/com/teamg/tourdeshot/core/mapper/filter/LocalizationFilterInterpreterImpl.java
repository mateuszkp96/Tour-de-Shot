package com.teamg.tourdeshot.core.mapper.filter;

import com.teamg.tourdeshot.core.api.local.filter.Localization;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.Objects;

@Component
public class LocalizationFilterInterpreterImpl implements LocalizationFilterInterpreter {

    private Double lat;
    private Double lon;
    private Double maxDistance;

    public LocalizationFilterInterpreterImpl(@Value("${app.localizationFilter.latitude}") Double lat,
                                             @Value("${app.localizationFilter.longitude}") Double lon,
                                             @Value("${app.localizationFilter.maxDistance}") Double maxDistance) {
        this.lat =  Objects.requireNonNullElse(lat, 52.236216);
        this.lon = Objects.requireNonNullElse(lon, 21.012059);
        this.maxDistance = Objects.requireNonNullElse(maxDistance, 1.0);
    }

    @Override
    public Localization getLocalizationData(Localization localization) {

        Localization newLocalization = createDefaultLocalizationData();

        if (Objects.nonNull((localization.getLat())))
            newLocalization.setLat(localization.getLat());
        if (Objects.nonNull((localization.getLon())))
            newLocalization.setLon(localization.getLon());
        if (Objects.nonNull((localization.getMaxDistance())))
            newLocalization.setMaxDistance(localization.getMaxDistance());

        return newLocalization;
    }

    @Override
    public Localization createDefaultLocalizationData() {
        return Localization.builder()
                .lat(BigDecimal.valueOf(lat))
                .lon(BigDecimal.valueOf(lon))
                .maxDistance(BigDecimal.valueOf(maxDistance))
                .build();
    }
}
