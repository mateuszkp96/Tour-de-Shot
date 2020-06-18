package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.local.products.dto.LocalProductsDTO;
import com.teamg.tourdeshot.core.service.LocalProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/localproducts")
public class LocalProductsController {

    private final LocalProductsService service;

    @Autowired
    public LocalProductsController(LocalProductsService service) {
        this.service = service;
    }

    @GetMapping(value = "/{localId}", params = "ids")
    public LocalProductsDTO getLocalWithProducts(@PathVariable(name = "localId") Long localId,
                                                 @RequestParam List<Long> ids) {
        return service.findLocalWithProducts(localId, ids);
    }
}
