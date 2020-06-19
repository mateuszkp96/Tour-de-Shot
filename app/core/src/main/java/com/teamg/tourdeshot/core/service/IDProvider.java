package com.teamg.tourdeshot.core.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class IDProvider {

    private static final String SEQUENCE_NAME = "product_sequence";

    private final SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public IDProvider(SequenceGeneratorService sequenceGeneratorService) {
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    public Long getProductId() {
        return sequenceGeneratorService.generateSequence(SEQUENCE_NAME);
    }
}
