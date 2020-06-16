package com.teamg.tourdeshot.userhistory.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class HistoryItemDTO {
    private Integer orderNumber;
    private Long localId;
    private String localName;
    private BigDecimal lat;
    private BigDecimal lon;
    private List<ProductSummaryDTO> products;
}
