package com.teamg.tourdeshot.userhistory.repository;

import com.teamg.tourdeshot.userhistory.model.History;
import com.teamg.tourdeshot.userhistory.model.UserHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface UserHistoryRepository {

    Optional<UserHistory> findByUserId(String id);

    UserHistory save(UserHistory history);

    Page<History> userHistoriesByUserId(String userId, Pageable pageable);

}
