package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.local.LocalDTO;
import com.teamg.tourdeshot.core.api.local.LocalPostDTO;
import com.teamg.tourdeshot.core.exception.ResourceNotFoundException;
import com.teamg.tourdeshot.core.mapper.LocalMapper;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.repository.LocalRepository;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;
import com.teamg.tourdeshot.core.repository.mongo.MongoLocalRepository;
import com.teamg.tourdeshot.core.service.calculation.DistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class LocalService {

    private final SequenceGeneratorService sequenceGeneratorService;
    private final LocalMapper localMapper;
    private final LocalRepository localRepository;

    @Autowired
    public LocalService(SequenceGeneratorService sequenceGeneratorService, LocalMapper localMapper, MongoLocalRepository localRepository) {
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.localMapper = localMapper;
        this.localRepository = localRepository;
    }

    public LocalDTO findLocalById(Long id) {
        return localRepository.findById(id)
                .map(localMapper::toLocalDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Local", "id", id));
    }

    public List<LocalDTO> findAllLocals() {
        return localMapper.toLocalDTOs(localRepository.findAll());
    }

    public List<LocalDTO> findAllPageable(Pageable pageable) {
        return localMapper.toLocalDTOs(localRepository.findAllPageable(pageable).getContent());
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

    public Local addLocal(LocalPostDTO localPostDTO) {
        Local local = localMapper.toLocal(localPostDTO);
        local.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        return localRepository.save(local);
    }

    public ResponseEntity<String> deleteById(Long id) {
        DeleteOperationResult result = localRepository.deleteById(id);
        return Utils.deleteOperationResultToResponseEntity(result, id);
    }

}
