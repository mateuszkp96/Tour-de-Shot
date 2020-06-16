package com.teamg.tourdeshot.core.api.product;

import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Product;
import com.teamg.tourdeshot.core.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Local addProductToLocal(@RequestBody Product product, @RequestParam Long localId) {
        return productService.addProductToLocal(product, localId);
    }
}
