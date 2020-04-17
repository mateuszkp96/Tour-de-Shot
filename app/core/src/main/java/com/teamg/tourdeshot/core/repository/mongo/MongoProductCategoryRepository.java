package com.teamg.tourdeshot.core.repository.mongo;

import com.mongodb.client.result.DeleteResult;
import com.teamg.tourdeshot.core.model.ProductCategory;
import com.teamg.tourdeshot.core.repository.ProductCategoryRepository;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteResultInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class MongoProductCategoryRepository implements ProductCategoryRepository {

    private final MongoOperations mongoOperations;
    private final DeleteResultInterpreter<DeleteResult> deleteResultInterpreter = new MongoDeleteResultInterpreter();

    @Autowired
    public MongoProductCategoryRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public List<ProductCategory> findAll() {
        return mongoOperations.findAll(ProductCategory.class);
    }

    @Override
    public Optional<ProductCategory> findById(Long categoryId) {
        return Optional.ofNullable(mongoOperations.findById(categoryId, ProductCategory.class));
    }

    @Override
    public ProductCategory save(ProductCategory productCategory) {
        return mongoOperations.save(productCategory);
    }

    @Override
    public boolean existsByParentId(Long parentId) {
        return mongoOperations.exists(query(where("parent.id").is(parentId)), ProductCategory.class);
    }

    @Override
    public DeleteOperationResult deleteById(Long id) {
        DeleteResult deleteResult = mongoOperations.remove(query(where("id").is(id)), ProductCategory.class);
        return deleteResultInterpreter.read(deleteResult);
    }

}
