package com.teamg.tourdeshot.userhistory.service;

import com.teamg.tourdeshot.userhistory.api.dto.HistoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {
    public Page<HistoryDTO> getHistory(PageRequest pageRequest) {
        return null;
    }
}
