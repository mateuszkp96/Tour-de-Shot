package com.teamg.tourdeshot.core.mapper;


import com.teamg.tourdeshot.core.api.local.domain.LocalDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalSimpleDTO;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.LocalWithDistance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Objects;

@Component
public class  LocalMapperImpl implements LocalMapper {

    private final CoordinatesMapper coordinatesMapper;
    private final AddressMapper addressMapper;
    private final ContactMapper contactMapper;
    private final MenuMapper menuMapper;
    private final OpeningHoursMapper openingHoursMapper;

    @Autowired
    public LocalMapperImpl(CoordinatesMapper coordinatesMapper,
                           AddressMapper addressMapper,
                           ContactMapper contactMapper,
                           MenuMapper menuMapper,
                           OpeningHoursMapper openingHoursMapper) {
        this.coordinatesMapper = coordinatesMapper;
        this.addressMapper = addressMapper;
        this.contactMapper = contactMapper;
        this.menuMapper = menuMapper;
        this.openingHoursMapper = openingHoursMapper;
    }

    @Override
    public LocalDTO toLocalDTO(Local local, LocalDateTime now) {
        return LocalDTO.builder()
                .id(local.getId())
                .name(local.getName())
                .coordinates(coordinatesMapper.toCoordinatesDTO(local.getCoordinates()))
                .address(addressMapper.toAddressDTO(local.getAddress()))
                .image(local.getImage())
                .localCategories(local.getLocalCategories())
                .priceCategory(local.getPriceCategory())
                .website(local.getWebsite())
                .contact(contactMapper.toContactDTO(local.getContact()))
                .openingHours(openingHoursMapper.toOpeningHoursDTO(local.getOpeningHours(), now))
                .menu(menuMapper.toMenuDTO(local.getMenu()))
                .build();
    }

    @Override
    public LocalSimpleDTO toLocalSimpleDTO(Local local, LocalDateTime now) {
        return LocalSimpleDTO.builder()
                .id(local.getId())
                .name(local.getName())
                .coordinates(coordinatesMapper.toCoordinatesDTO(local.getCoordinates()))
                .address(addressMapper.toAddressDTO(local.getAddress()))
                .image(local.getImage())
                .localCategories(local.getLocalCategories())
                .priceCategory(local.getPriceCategory())
                .openingHours(openingHoursMapper.toOpeningHoursDTO(local.getOpeningHours(), now))
                .build();
    }

    @Override
    public LocalSimpleDTO toLocalSimpleDTOFromLocalWithDistance(LocalWithDistance local, LocalDateTime now) {
        return LocalSimpleDTO.builder()
                .id(local.getId())
                .name(local.getName())
                .coordinates(coordinatesMapper.toCoordinatesDTO(local.getCoordinates()))
                .distance(Objects.nonNull(local.getDistance()) ? local.getDistance() : null)
                .address(addressMapper.toAddressDTO(local.getAddress()))
                .image(local.getImage())
                .localCategories(local.getLocalCategories())
                .priceCategory(local.getPriceCategory())
                .openingHours(openingHoursMapper.toOpeningHoursDTO(local.getOpeningHours(), now))
                .build();
    }

}
