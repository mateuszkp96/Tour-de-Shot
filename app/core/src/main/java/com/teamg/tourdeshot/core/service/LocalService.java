package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.local.LocalDTO;
import com.teamg.tourdeshot.core.mapper.LocalMapper;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.List;

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

    @EventListener(ApplicationReadyEvent.class)
    public void onStart() {
        // Sample how to generate id for document
        Local local = new Local();
        local.setId(sequenceGeneratorService.generateSequence(Local.SEQUENCE_NAME));
        local.setName("LocalName");

        localRepository.save(local);
    }
}
