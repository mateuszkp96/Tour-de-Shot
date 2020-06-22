package com.teamg.tourdeshot.core.repository.mongo;

import com.mongodb.BasicDBObject;
import com.teamg.tourdeshot.core.exception.ResourceNotFoundException;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Product;
import com.teamg.tourdeshot.core.model.ProductCategory;
import com.teamg.tourdeshot.core.repository.ProductCategoryRepository;
import com.teamg.tourdeshot.core.repository.ProductRepository;
import com.teamg.tourdeshot.core.service.IDProvider;
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

    private final ProductCategoryRepository productCategoryRepository;

    private final IDProvider idProvider;


    @Autowired
    public MongoProductRepository(MongoOperations mongoOperations, ProductCategoryRepository productCategoryRepository, IDProvider idProvider) {
        this.mongoOperations = mongoOperations;
        this.productCategoryRepository = productCategoryRepository;
        this.idProvider = idProvider;
    }

    @Override
    public Local addProductToLocal(Product product, Long categoryId, Long localId, Long orderNumber) {
        ProductCategory productCategory = productCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("ProductCategory", "id", categoryId));
        product.setProductCategory(productCategory);
        product.setProductId(idProvider.getProductId());
        return mongoOperations.findAndModify(query(where("id").is(localId).and("menu.items.orderNumber").is(orderNumber)),
                new Update().addToSet("menu.items.$.products", product),
                options().returnNew(true).upsert(false),
                Local.class);
    }

    @Override
    public Local deleteProductFromMenu(Long localId, Long orderNumber, Long productId) {
        return mongoOperations.findAndModify(query(where("id").is(localId).and("menu.items.orderNumber").is(orderNumber)),
                new Update().pull("menu.items.$.products",  new BasicDBObject( "productId", productId)),
                options().returnNew(true).upsert(false),
                Local.class);
    }
}
