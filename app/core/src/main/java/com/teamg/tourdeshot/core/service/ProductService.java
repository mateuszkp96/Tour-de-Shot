package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Product;
import com.teamg.tourdeshot.core.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Local addProductToLocal(Product product, Long localId) {
        return productRepository.addProductToLocal(product, localId);
    }
}
