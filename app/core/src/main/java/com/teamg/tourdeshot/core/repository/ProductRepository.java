package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Product;

public interface ProductRepository {

    Local addProductToLocal(Product product, Long categoryId, Long localId, Long orderNumber);
}
