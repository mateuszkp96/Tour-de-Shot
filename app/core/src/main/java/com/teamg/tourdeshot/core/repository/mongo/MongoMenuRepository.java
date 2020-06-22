package com.teamg.tourdeshot.core.repository.mongo;

import com.mongodb.BasicDBObject;
import com.teamg.tourdeshot.core.api.menu.dto.MenuItemPostDTO;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.model.MenuItem;
import com.teamg.tourdeshot.core.repository.MenuRepository;
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
    public Local addMenuToLocal(Menu menu, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().set("menu", menu),
                options().returnNew(true).upsert(true),
                Local.class);
    }

    @Override
    public Local addSectionToMenu(MenuItem menuItem, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().addToSet("menu.$.items", menuItem),
                options().returnNew(true).upsert(false),
                Local.class);
    }

    @Override
    public Local updateSection(MenuItemPostDTO menuItem, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId).and("menu.items.orderNumber").is(menuItem.getOrderNumber())),
                new Update().set("menu.items.$.categoryHeader", menuItem.getCategoryHeader()),
                options().returnNew(true).upsert(false),
                Local.class);
    }

    @Override
    public Local deleteSection(Long orderNumber, Long localId) {
        return mongoOperations.findAndModify(query(where("id").is(localId)),
                new Update().pull("menu.items", new BasicDBObject("orderNumber", orderNumber)),
                options().returnNew(true).upsert(false),
                Local.class);
    }
}
