package com.teamg.tourdeshot.core.mapper;

import com.teamg.tourdeshot.core.api.local.domain.MenuItemDTO;
import com.teamg.tourdeshot.core.model.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class MenuItemMapperImpl implements MenuItemMapper {

    private final ProductMapper productMapper;

    @Autowired
    public MenuItemMapperImpl(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    @Override
    public MenuItemDTO toMenuItemDTO(MenuItem menuItem) {
        if(Objects.isNull(menuItem))
            return null;
        return MenuItemDTO.builder()
                .categoryHeader(menuItem.getCategoryHeader())
                .orderNumber(menuItem.getOrderNumber())
                .products(productMapper.toProductDTOs(menuItem.getProducts()))
                .build();
    }
}
