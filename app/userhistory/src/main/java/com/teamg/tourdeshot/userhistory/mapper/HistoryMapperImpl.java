package com.teamg.tourdeshot.userhistory.mapper;

import com.teamg.tourdeshot.userhistory.api.dto.history.CoordinatesDTO;
import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryDTO;
import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryItemDTO;
import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryProductDTO;
import com.teamg.tourdeshot.userhistory.model.History;
import com.teamg.tourdeshot.userhistory.model.HistoryItem;
import com.teamg.tourdeshot.userhistory.model.ProductSummary;
import org.springframework.stereotype.Component;

import java.util.Comparator;

import static java.util.stream.Collectors.toList;

@Component
public class HistoryMapperImpl implements HistoryMapper {

    @Override
    public HistoryDTO toHistoryDTO(History history) {
        return HistoryDTO.builder()
                .id(history.getId())
                .name(history.getName())
                .timestamp(history.getTimestamp())
                .items(history.getItems().stream()
                        .map(this::toHistoryItemDTO)
                        .sorted(Comparator.comparingInt(HistoryItemDTO::getOrderNumber))
                        .collect(toList()))
                .price(history.getCost())
                .build();
    }

    private HistoryItemDTO toHistoryItemDTO(HistoryItem historyItem) {
        return HistoryItemDTO.builder()
                .localId(historyItem.getLocalId())
                .localName(historyItem.getLocalName())
                .coordinates(new CoordinatesDTO(historyItem.getCoordinates().getLat(), historyItem.getCoordinates().getLon()))
                .orderNumber(historyItem.getOrderNumber())
                .products(
                        historyItem.getProducts()
                                .stream()
                                .map(this::toHistoryProductDTO)
                                .sorted(Comparator.comparing(HistoryProductDTO::getName))
                                .collect(toList()))
                .build();
    }

    private HistoryProductDTO toHistoryProductDTO(ProductSummary productSummary) {
        return HistoryProductDTO.builder()
                .productId(productSummary.getProductId())
                .name(productSummary.getProductName())
                .price(productSummary.getPrice())
                .quantity(productSummary.getQuantity())
                .build();
    }
}
