package com.teamg.tourdeshot.core.repository.mongo;

import com.mongodb.client.result.DeleteResult;
import com.teamg.tourdeshot.core.api.local.filter.FilterRequestBody;
import com.teamg.tourdeshot.core.api.local.filter.Localization;
import com.teamg.tourdeshot.core.mapper.filter.LocalFiltersInterpreter;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.LocalWithDistance;
import com.teamg.tourdeshot.core.repository.LocalRepository;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteResultInterpreter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Metrics;
import org.springframework.data.geo.Point;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.NearQuery;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class MongoLocalRepository implements LocalRepository {

    private final MongoOperations mongoOperations;
    private final DeleteResultInterpreter<DeleteResult> deleteResultInterpreter = new MongoDeleteResultInterpreter();
    private final LocalFiltersInterpreter localFiltersInterpreter;

    @Autowired
    public MongoLocalRepository(MongoOperations mongoOperations, LocalFiltersInterpreter localFiltersInterpreter) {
        this.mongoOperations = mongoOperations;
        this.localFiltersInterpreter = localFiltersInterpreter;
    }

    @Override
    public Optional<Local> findById(Long localId) {
        return Optional.ofNullable(mongoOperations.findById(localId, Local.class));
    }

    @Override
    public Page<Local> findAllPageable(Pageable pageable) {
        Query query = new Query().with(pageable);
        List<Local> localList = mongoOperations.find(query, Local.class);
        return PageableExecutionUtils.getPage(
                localList,
                pageable,
                () -> mongoOperations.count(Query.of(query).limit(-1).skip(-1), Local.class));
    }

    @Override
    public Page<LocalWithDistance> filterLocals(Pageable pageable, FilterRequestBody requestBody) {
        Localization geoFilterData = localFiltersInterpreter.extractLocalizationData(requestBody);
        Point point = new Point(geoFilterData.getLat().doubleValue(), geoFilterData.getLon().doubleValue());
        Distance distance = new Distance(geoFilterData.getMaxDistance().doubleValue(), Metrics.KILOMETERS);
        NearQuery query = NearQuery.near(point).maxDistance(distance).with(pageable).limit(100);
        GeoNearOperation operation = Aggregation.geoNear(query, "distance");
        MatchOperation matchOperation = Aggregation.match(localFiltersInterpreter.criteriaBuilder(requestBody));
        TypedAggregation<Local> typedAggregation = new TypedAggregation<>(Local.class, operation, matchOperation);
        AggregationResults<LocalWithDistance> results = mongoOperations.aggregate(typedAggregation, Local.class, LocalWithDistance.class);

        return PageableExecutionUtils.getPage(
                results.getMappedResults(),
                pageable,
                () -> results.getMappedResults().size());
    }

    @Override
    public List<Local> findAll() {
        return mongoOperations.findAll(Local.class);
    }

    @Override
    public Local save(Local local) {
        return mongoOperations.save(local);
    }

    @Override
    public DeleteOperationResult deleteById(Long localId) {
        DeleteResult deleteResult = mongoOperations.remove(query(where("id").is(localId)), Local.class);
        return deleteResultInterpreter.read(deleteResult);
    }
}
