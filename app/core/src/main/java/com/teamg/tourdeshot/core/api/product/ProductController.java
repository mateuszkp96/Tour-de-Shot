package com.teamg.tourdeshot.core.api.product;

import com.teamg.tourdeshot.core.api.product.dto.ProductPostDTO;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @DeleteMapping
    public Local deleteProductFromMenu(@RequestParam Long localId, @RequestParam Long orderNumber, @RequestParam Long productId){
        return productService.deleteProductFromMenu(localId, orderNumber, productId);
    }
}
