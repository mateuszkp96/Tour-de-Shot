package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import static org.springframework.data.mongodb.core.FindAndModifyOptions.options;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class MongoMenuRepository implements MenuRepository {

    private final MongoOperations mongoOperations;

    @Autowired
    public MongoMenuRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public Menu addMenuToLocal(Menu menu, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().set("menu", menu),
                options().returnNew(true).upsert(true),
                Local.class).getMenu();    }
}
