package com.teamg.tourdeshot.user.repository;

import com.teamg.tourdeshot.user.entity.DeactivationEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DeactivationEventRepository extends MongoRepository<DeactivationEvent, Long> {

}
