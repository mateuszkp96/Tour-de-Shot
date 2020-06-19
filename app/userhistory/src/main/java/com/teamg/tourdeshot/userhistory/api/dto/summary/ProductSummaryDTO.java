package com.teamg.tourdeshot.userhistory.api.dto.summary;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProductSummaryDTO {
    private Long productId;
    private Integer quantity;
}
