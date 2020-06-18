package com.teamg.tourdeshot.userhistory.repository.mongo;

import com.teamg.tourdeshot.userhistory.model.History;
import com.teamg.tourdeshot.userhistory.model.UserHistory;
import com.teamg.tourdeshot.userhistory.repository.UserHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class MongoUserHistoryRepository implements UserHistoryRepository {

    private final MongoOperations mongoOperations;

    @Autowired
    public MongoUserHistoryRepository(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public Optional<UserHistory> findByUserId(String userId) {
        return Optional.ofNullable(mongoOperations.findOne(query(where("userId").is(userId)), UserHistory.class));
    }

    @Override
    public UserHistory save(UserHistory history) {
        return mongoOperations.save(history);
    }

    @Override
    public Page<History> userHistoriesByUserId(String userId, Pageable pageable) {
        List<History> histories = findByUserId(userId)
                .map(userHistory ->
                        userHistory.getHistories().values().stream()
                            .sorted(Comparator.comparing(History::getTimestamp))
                            .collect(Collectors.toList())
                ).orElse(new ArrayList<>());

        return PageableExecutionUtils.getPage(
                histories,
                pageable,
                histories::size);
    }
}
