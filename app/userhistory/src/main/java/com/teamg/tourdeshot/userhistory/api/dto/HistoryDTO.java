package com.teamg.tourdeshot.userhistory.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
}
