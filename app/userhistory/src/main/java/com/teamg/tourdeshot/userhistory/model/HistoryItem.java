package com.teamg.tourdeshot.userhistory.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryItem {

    private Integer orderNumber;

    private Long localId;

    private String localName;

    private Coordinates coordinates;

    private List<ProductSummary> products;
}
