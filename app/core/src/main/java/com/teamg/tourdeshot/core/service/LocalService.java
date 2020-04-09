package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.local.LocalDTO;
import com.teamg.tourdeshot.core.api.local.LocalPostDTO;
import com.teamg.tourdeshot.core.exception.ResourceNotFoundException;
import com.teamg.tourdeshot.core.mapper.LocalMapper;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.model.Product;
import com.teamg.tourdeshot.core.repository.LocalRepository;
import com.teamg.tourdeshot.core.service.calculation.DistanceCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import java.util.Comparator;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class LocalService {

    private final LocalRepository localRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final LocalMapper localMapper;
    private MongoOperations mongoOperations;

    @Autowired
    public LocalService(LocalRepository localRepository, SequenceGeneratorService sequenceGeneratorService, LocalMapper localMapper, MongoOperations mongoOperations) {
        this.localRepository = localRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.localMapper = localMapper;
        this.mongoOperations = mongoOperations;
    }

    public LocalDTO findLocalById(Long id) {
        return localMapper.toLocalDTO(localRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Local", "id", id)));
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
        return localRepository.save(local);
    }

    public Local addMenuToLocal(Menu menu, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().set("menu", menu),
                options().returnNew(true).upsert(true),
                Local.class);
    }

    public Local addProductToLocal(Product product, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().addToSet("menu.products", product),
                options().returnNew(true).upsert(false),
                Local.class);
    }

    public void deleteById(Long id) {
        localRepository.deleteById(id);
    }

    public void deleteAll() {
        localRepository.deleteAll();
    }

}
