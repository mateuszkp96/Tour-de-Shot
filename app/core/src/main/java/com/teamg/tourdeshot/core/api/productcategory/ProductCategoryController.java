package com.teamg.tourdeshot.core.api.productcategory;

import com.teamg.tourdeshot.core.api.productcategory.dto.ProductCategoryDTO;
import com.teamg.tourdeshot.core.model.ProductCategory;
import com.teamg.tourdeshot.core.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/product-category")
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    @Autowired
    public ProductCategoryController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    public ResponseEntity<List<ProductCategoryDTO>> findAll() {
        return productCategoryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCategoryDTO> findById(@PathVariable Long id) {
        return productCategoryService.findById(id);
    }

    @PostMapping
    public ResponseEntity<ProductCategory> addCategory(@RequestBody ProductCategory productCategory) {
        return productCategoryService.addCategory(productCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        return productCategoryService.deleteById(id);
    }
}
