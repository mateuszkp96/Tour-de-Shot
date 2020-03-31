package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.Local;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocalRepository extends MongoRepository<Local, Long> {

}
