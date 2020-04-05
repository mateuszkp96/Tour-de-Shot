package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.local.LocalDTO;
import com.teamg.tourdeshot.core.mapper.LocalMapper;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.repository.LocalRepository;
import com.teamg.tourdeshot.core.service.calculation.DistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import static java.util.stream.Collectors.toList;

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

    public List<LocalDTO> findAllSortedByDistance(Coordinates coordinates) {
       return localRepository.findAll().stream()
                .map(local -> {
                    LocalDTO localDTO = localMapper.toLocalDTO(local);
                    localDTO.setDistance(DistanceCalculator.calculate(coordinates, local.getCoordinates()));
                    return localDTO;
                })
               .sorted(Comparator.comparing(LocalDTO::getDistance))
               .collect(toList());
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onStart() {
        // Sample data
        Local local1 = new Local();
        local1.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        local1.setName("Setka");
        local1.setCoordinates(new Coordinates(new BigDecimal("52.236663"), new BigDecimal("21.014656")));

        Local local2 = new Local();
        local2.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        local2.setName("Pijalnia piwa i wódki");
        local2.setCoordinates(new Coordinates(new BigDecimal("52.232380"), new BigDecimal("21.019964")));

        Local local3 = new Local();
        local3.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        local3.setName("PiwPaw");
        local3.setCoordinates(new Coordinates(new BigDecimal("52.228337"), new BigDecimal("21.013993")));

        List<Local> locals = Arrays.asList(local1, local2, local3);
        localRepository.saveAll(locals);
    }
}
