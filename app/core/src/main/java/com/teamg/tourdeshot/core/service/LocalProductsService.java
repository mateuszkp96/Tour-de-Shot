package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.api.local.products.dto.Coordinates;
import com.teamg.tourdeshot.core.api.local.products.dto.LocalProductsDTO;
import com.teamg.tourdeshot.core.api.local.products.dto.Product;
import com.teamg.tourdeshot.core.exception.ResourceNotFoundException;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.repository.LocalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocalProductsService {

    private final LocalRepository localRepository;

    @Autowired
    public LocalProductsService(LocalRepository localRepository) {
        this.localRepository = localRepository;
    }

    public LocalProductsDTO findLocalWithProducts(Long localId, List<Long> ids) {
        return localRepository.findById(localId)
                .map(local -> LocalProductsDTO.builder()
                        .id(local.getId())
                        .name(local.getName())
                        .coordinates(new Coordinates(BigDecimal.valueOf(local.getCoordinates()[0]), BigDecimal.valueOf(local.getCoordinates()[1])))
                        .products(getProducts(local, ids))
                        .build())
                .orElseThrow(() -> new ResourceNotFoundException("Local", "id", localId));
    }


    private List<Product> getProducts(Local local, List<Long> ids) {
        return local.getMenu().getItems().stream()
                .flatMap(menuItem ->
                        menuItem.getProducts().stream()
                                .filter(product -> ids.contains(product.getProductId()))
                )
                .map(product -> new Product(product.getProductId(), product.getName(), product.getPrice()))
                .collect(Collectors.toList());
    }

}
