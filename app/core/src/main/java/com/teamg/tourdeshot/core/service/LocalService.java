package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.local.LocalDTO;
import com.teamg.tourdeshot.core.api.local.LocalPostDTO;
import com.teamg.tourdeshot.core.mapper.LocalMapper;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.model.Product;
import com.teamg.tourdeshot.core.repository.LocalRepositoryProxy;
import com.teamg.tourdeshot.core.service.calculation.DistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class LocalService {

    private final SequenceGeneratorService sequenceGeneratorService;
    private final LocalMapper localMapper;
    private final LocalRepositoryProxy localRepository;

    @Autowired
    public LocalService(SequenceGeneratorService sequenceGeneratorService, LocalMapper localMapper, LocalRepositoryProxy localRepository) {
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.localMapper = localMapper;
        this.localRepository = localRepository;
    }

    public LocalDTO findLocalById(Long id) {
        return localMapper.toLocalDTO(localRepository.findById(id));
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

    public Local addLocal(LocalPostDTO localPostDTO) {
        Local local = localMapper.toLocal(localPostDTO);
        local.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        return localRepository.addLocal(local);
    }

    public Local addMenuToLocal(Menu menu, Long localId) {
        return localRepository.addMenuToLocal(menu, localId);
    }

    public Local addProductToLocal(Product product, Long localId) {
        return localRepository.addProductToLocal(product, localId);
    }

    public void deleteById(Long id) {
        localRepository.deleteById(id);
    }

    public void deleteAll() {
        localRepository.deleteAll();
    }

}
