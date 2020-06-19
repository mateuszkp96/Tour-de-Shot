package com.teamg.tourdeshot.userhistory.service;

import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryDTO;
import com.teamg.tourdeshot.userhistory.mapper.HistoryMapper;
import com.teamg.tourdeshot.userhistory.repository.UserHistoryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class HistoryService {

    private final UserHistoryRepository repository;
    private final HistoryMapper mapper;

    public HistoryService(UserHistoryRepository repository, HistoryMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    public Page<HistoryDTO> getHistory(String userId, PageRequest pageRequest) {
        return repository.userHistoriesByUserId(userId, pageRequest)
                .map( mapper::toHistoryDTO);
    }
}
