package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.local.LocalDTO;
import com.teamg.tourdeshot.core.mapper.LocalMapper;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocalService {

    private final LocalRepository localRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final LocalMapper localMapper;

    @Autowired
    public LocalService(LocalRepository localRepository, SequenceGeneratorService sequenceGeneratorService, LocalMapper localMapper) {
        this.localRepository = localRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.localMapper = localMapper;
    }

    public List<LocalDTO> findAllLocals() {
        return localMapper.toLocalDTOs(localRepository.findAll());
    }

    public List<LocalDTO> findAllLocalsByDistance(Coordinates coordinates) {
        return localMapper.toLocalDTOs(sortLocalsByDistance(localRepository.findAll(), coordinates));
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onStart() {
        // Sample data
        Local local1 = new Local();
        local1.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        local1.setName("Setka");
        local1.setCoordinates(new Coordinates(new BigDecimal(52.236663), new BigDecimal(21.014656)));

        Local local2 = new Local();
        local2.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        local2.setName("Pijalnia piwa i wódki");
        local2.setCoordinates(new Coordinates(new BigDecimal(52.232380), new BigDecimal(21.019964)));

        Local local3 = new Local();
        local3.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        local3.setName("PiwPaw");
        local3.setCoordinates(new Coordinates(new BigDecimal(52.228337), new BigDecimal(21.013993)));

        List<Local> locals = Arrays.asList(local1, local2, local3);
        localRepository.saveAll(locals);
    }

    private double calculateDistance(Coordinates userLocalization, Coordinates localLocalization) {

        final int R = 6371; // Radius of the earth
        double lat1 = localLocalization.getLat().doubleValue();
        double lat2 = userLocalization.getLat().doubleValue();
        double lon1 = localLocalization.getLon().doubleValue();
        double lon2 = userLocalization.getLon().doubleValue();
        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distance = R * c * 1000; // convert to meters

        return distance;
    }

    private List<Local> sortLocalsByDistance(List<Local> localListToSort, Coordinates coordinates) {
        localListToSort.sort((l1, l2) -> {
            double distance1 = calculateDistance(l1.getCoordinates(), coordinates);
            double distance2 = calculateDistance(l2.getCoordinates(), coordinates);

            if(distance1 > distance2)
                return 1;
            else if (distance1 < distance2)
                return -1;
            else return 0;
        });
        return localListToSort;
    }

}
