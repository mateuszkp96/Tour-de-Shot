package com.teamg.tourdeshot.userhistory.mapper;

import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryDTO;
import com.teamg.tourdeshot.userhistory.model.History;

import java.util.List;

import static java.util.stream.Collectors.toList;

public interface HistoryMapper {
    HistoryDTO toHistoryDTO(History history);

    default List<HistoryDTO> toHistoryDTOs(List<History> histories) {
        return histories.stream()
                .map(this::toHistoryDTO)
                .collect(toList());
    }
}

