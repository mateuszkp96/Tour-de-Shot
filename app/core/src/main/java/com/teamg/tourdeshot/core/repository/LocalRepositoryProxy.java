package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.exception.ResourceNotFoundException;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class LocalRepositoryProxy implements ProductRepository, MenuRepository {

    private  LocalRepository localRepository;
    private  MongoOperations mongoOperations;

    @Autowired
    public LocalRepositoryProxy(LocalRepository localRepository, MongoOperations mongoOperations) {
        this.localRepository = localRepository;
        this.mongoOperations = mongoOperations;
    }

    public Local findById(Long localId) {
        return localRepository.findById(localId).orElseThrow(() -> new ResourceNotFoundException("Local", "id", localId));
    }

    public List<Local> findAll() {
        return localRepository.findAll();
    }

    public Local addLocal(Local local) {
        return localRepository.save(local);
    }

    @Override
    public Local addMenuToLocal(Menu menu, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().set("menu", menu),
                options().returnNew(true).upsert(true),
                Local.class);
    }

    @Override
    public Local addProductToLocal(Product product, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().addToSet("menu.products", product),
                options().returnNew(true).upsert(false),
                Local.class);
    }

    public void deleteById(Long localId) {
        localRepository.deleteById(localId);
    }

    public void deleteAll() {
        localRepository.deleteAll();
    }
}
