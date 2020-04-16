package com.teamg.tourdeshot.core.repository.mongo;

import com.mongodb.client.result.DeleteResult;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.repository.LocalRepository;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteResultInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class MongoLocalRepository implements LocalRepository {

    private final MongoOperations mongoOperations;
    private final DeleteResultInterpreter<DeleteResult> deleteResultInterpreter = new MongoDeleteResultInterpreter();

    @Autowired
    public MongoLocalRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public Optional<Local> findById(Long localId) {
        return Optional.ofNullable(mongoOperations.findById(localId, Local.class));
    }

    @Override
    public Page<Local> findAllPageable(Pageable pageable) {
        Query query = new Query().with(pageable);
        List<Local> localList = mongoOperations.find(query, Local.class);
        long count = mongoOperations.count(query, Local.class);
        Page<Local> resultPage = new PageImpl<>(localList , pageable, count);
        return resultPage;
    }

    @Override
    public List<Local> findAll() {
        return mongoOperations.findAll(Local.class);
    }

    @Override
    public Local save(Local local) {
        return mongoOperations.save(local);
    }

    @Override
    public DeleteOperationResult deleteById(Long localId) {
        DeleteResult deleteResult = mongoOperations.remove(query(where("id").is(localId)), Local.class);
        return deleteResultInterpreter.read(deleteResult);
    }
}
