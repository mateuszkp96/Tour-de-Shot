package com.teamg.tourdeshot.userhistory.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class SummaryPostDTO {
    private String userId;
    private String name;
    private List<SummaryItemDTO> items;
}
