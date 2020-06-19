package com.teamg.tourdeshot.userhistory.api.dto.summary;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SummaryItemDTO {
    private Integer orderNumber;
    private Long localId;
    private List<ProductSummaryDTO> products;
}
