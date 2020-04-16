package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class MongoProductRepository implements ProductRepository {

    private final MongoOperations mongoOperations;

    @Autowired
    public MongoProductRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public Local addProductToLocal(Product product, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().addToSet("menu.products", product),
                options().returnNew(true).upsert(false),
                Local.class);
    }
}
