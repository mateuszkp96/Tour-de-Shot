package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.productcategory.dto.ProductCategoryDTO;
import com.teamg.tourdeshot.core.exception.ResourceNotFoundException;
import com.teamg.tourdeshot.core.mapper.ProductCategoryMapper;
import com.teamg.tourdeshot.core.model.ProductCategory;
import com.teamg.tourdeshot.core.repository.ProductCategoryRepository;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductCategoryService {

    private final SequenceGeneratorService sequenceGeneratorService;
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductCategoryMapper productCategoryMapper;

    @Autowired
    public ProductCategoryService(SequenceGeneratorService sequenceGeneratorService, ProductCategoryRepository productCategoryRepository, ProductCategoryMapper productCategoryMapper) {
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.productCategoryRepository = productCategoryRepository;
        this.productCategoryMapper = productCategoryMapper;
    }

    public ResponseEntity<List<ProductCategoryDTO>> findAll() {
        List<ProductCategoryDTO> categoryDTOList = productCategoryMapper.toProductCategoryDTOs(productCategoryRepository.findAll());
        return new ResponseEntity<>(categoryDTOList, HttpStatus.OK);
    }

    public ResponseEntity<ProductCategoryDTO> findById(long categoryId) {
        return productCategoryRepository.findById(categoryId)
                .map(productCategoryMapper::toProductCategoryDTO)
                .map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElseThrow(() -> new ResourceNotFoundException("ProductCategory", "id", categoryId));
    }

    public ResponseEntity<ProductCategory> addCategory(ProductCategory productCategory) {
        productCategory.setId(sequenceGeneratorService.generateSequence(ProductCategory.PRODUCT_CATEGORIES_SEQUENCE_NAME));
        return new ResponseEntity<>(productCategoryRepository.save(productCategory), HttpStatus.CREATED);
    }

    public ResponseEntity<String> deleteById(Long id) {
        DeleteOperationResult result = productCategoryRepository.deleteById(id);
        return Utils.deleteOperationResultToResponseEntity(result, id);
    }
}
