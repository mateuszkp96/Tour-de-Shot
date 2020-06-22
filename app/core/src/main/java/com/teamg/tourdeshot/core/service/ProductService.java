package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.product.dto.ProductPostDTO;
import com.teamg.tourdeshot.core.mapper.ProductMapper;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;



    @Autowired
    public ProductService(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public Local addProductToLocal(ProductPostDTO product, Long localId, Long orderNumber) {
        Long categoryId = product.getCategoryId();
        return productRepository.addProductToLocal(productMapper.toProduct(product), categoryId, localId, orderNumber);
    }

    public Local deleteProductFromMenu(Long localId, Long orderNumber, Long productId) {
        return productRepository.deleteProductFromMenu(localId, orderNumber, productId);
    }
}
