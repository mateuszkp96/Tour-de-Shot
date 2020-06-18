package com.teamg.tourdeshot.userhistory.api.dto.history;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class HistoryDTO {
    private Long id;
    private String name;
    private LocalDateTime timestamp;
    private List<HistoryItemDTO> items;
    private BigDecimal price;
}
