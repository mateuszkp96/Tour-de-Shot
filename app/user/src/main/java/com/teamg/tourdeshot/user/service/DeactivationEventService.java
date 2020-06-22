package com.teamg.tourdeshot.user.service;

import com.teamg.tourdeshot.user.entity.DeactivationEvent;
import com.teamg.tourdeshot.user.repository.DeactivationEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class DeactivationEventService {

    private final DeactivationEventRepository deactivationEventRepository;
    private final SequenceGeneratorService sequenceGeneratorService;
    private final UserService userService;

    @Autowired
    public DeactivationEventService(DeactivationEventRepository deactivationEventRepository, SequenceGeneratorService sequenceGeneratorService, UserService userService) {
        this.deactivationEventRepository = deactivationEventRepository;
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.userService = userService;
    }

    public void saveDeactivationEvent(String username) {

        if (userService.userCreated(username)) {
            DeactivationEvent deactivationEvent = DeactivationEvent.builder()
                    .id(sequenceGeneratorService.generateSequence(DeactivationEvent.SEQUENCE_NAME))
                    .timestampDeactivationProfile(LocalDateTime.now())
                    .username(username)
                    .build();
            deactivationEventRepository.save(deactivationEvent);
        }
    }
}
