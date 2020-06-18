package com.teamg.tourdeshot.core.api.product;

import com.teamg.tourdeshot.core.api.product.dto.ProductPostDTO;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Product;
import com.teamg.tourdeshot.core.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public Local addProductToLocal(@RequestBody ProductPostDTO product, @RequestParam Long localId, @RequestParam Long orderNumber) {
        return productService.addProductToLocal(product, localId, orderNumber);
    }
}
