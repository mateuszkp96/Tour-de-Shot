package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.ProductCategory;
import com.teamg.tourdeshot.core.repository.crud.CrudRepo;

public interface ProductCategoryRepository extends CrudRepo<ProductCategory, Long> {

    boolean existsByParentId(Long parentId);

}
