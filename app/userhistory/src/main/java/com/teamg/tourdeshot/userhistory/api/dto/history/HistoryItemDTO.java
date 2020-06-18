package com.teamg.tourdeshot.userhistory.api.dto.history;

import com.teamg.tourdeshot.userhistory.api.dto.summary.ProductSummaryDTO;
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
    private CoordinatesDTO coordinates;
    private List<HistoryProductDTO> products;
}
