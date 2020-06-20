package com.teamg.tourdeshot.userhistory.service;

import com.google.common.collect.Streams;
import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryDTO;
import com.teamg.tourdeshot.userhistory.api.dto.summary.ProductSummaryDTO;
import com.teamg.tourdeshot.userhistory.api.dto.summary.SummaryItemDTO;
import com.teamg.tourdeshot.userhistory.api.dto.summary.SummaryPostDTO;
import com.teamg.tourdeshot.userhistory.mapper.HistoryMapper;
import com.teamg.tourdeshot.userhistory.model.History;
import com.teamg.tourdeshot.userhistory.model.HistoryItem;
import com.teamg.tourdeshot.userhistory.model.ProductSummary;
import com.teamg.tourdeshot.userhistory.model.UserHistory;
import com.teamg.tourdeshot.userhistory.repository.UserHistoryRepository;
import com.teamg.tourdeshot.userhistory.service.client.local.LocalHttpClient;
import com.teamg.tourdeshot.userhistory.service.client.local.dto.Coordinates;
import com.teamg.tourdeshot.userhistory.service.client.local.dto.Local;
import com.teamg.tourdeshot.userhistory.service.client.local.dto.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Stream;

import static java.util.Comparator.comparingLong;
import static java.util.stream.Collectors.toList;

@Service
public class SummaryService {
    private final SequenceGeneratorService sequenceGeneratorService;
    private final LocalHttpClient localHttpClient;
    private final UserHistoryRepository repository;
    private final HistoryMapper mapper;

    @Autowired
    public SummaryService(SequenceGeneratorService sequenceGeneratorService,
                          LocalHttpClient localHttpClient,
                          UserHistoryRepository historyRepository, HistoryMapper mapper) {
        this.sequenceGeneratorService = sequenceGeneratorService;
        this.localHttpClient = localHttpClient;
        this.repository = historyRepository;
        this.mapper = mapper;
    }

    public ResponseEntity<HistoryDTO> addSummaryToHistory(SummaryPostDTO dto, String userId) {
        LocalDateTime timestamp = LocalDateTime.now();
        List<HistoryItem> historyItems =
                dto.getItems().stream()
                        .map(this::toHistoryItem)
                        .collect(toList());

        History history = new History();
        history.setName(dto.getName());
        history.setTimestamp(timestamp);
        history.setItems(historyItems);
        history.setCost(CostCalculationUtils.calculateCost(historyItems));
        HistoryDTO createdHistory = saveHistory(history, userId);
        return new ResponseEntity<>(createdHistory, HttpStatus.CREATED);
    }

    private HistoryItem toHistoryItem(SummaryItemDTO dto) {
        List<Long> productIds = dto.getProducts().stream()
                .map(ProductSummaryDTO::getProductId)
                .collect(toList());
        ResponseEntity<Local> localData = localHttpClient.getLocal(dto.getLocalId(), productIds);
        // maybe check status code?
        Local local = Objects.requireNonNull(localData.getBody());

        Stream<Product> productStream =
                local.getProducts().stream()
                        .sorted(comparingLong(Product::getProductId));
        Stream<ProductSummaryDTO> productSummaryDTOStream =
                dto.getProducts().stream()
                        .sorted(comparingLong(ProductSummaryDTO::getProductId));

        List<ProductSummary> productSummaryList = Streams.zip(productStream, productSummaryDTOStream, Pair::of)
                .map(pair -> {
                            Product p = pair.getFirst();
                            return new ProductSummary(p.getProductId(), p.getName(), p.getPrice(), pair.getSecond().getQuantity());
                        }
                ).collect(toList());
        return new HistoryItem(dto.getOrderNumber(), dto.getLocalId(), local.getName(), toModelCoordinates(local.getCoordinates()), productSummaryList);
    }

    private com.teamg.tourdeshot.userhistory.model.Coordinates toModelCoordinates(Coordinates coordinates) {
        return new com.teamg.tourdeshot.userhistory.model.Coordinates(coordinates.getLat(), coordinates.getLon());
    }

    private HistoryDTO saveHistory(History history, String userId) {
        return repository.findByUserId(userId)
                .map(userHistory -> saveNewHistory(userHistory, history, getHistoryKey(history)))
                .orElse(creteNewUserHistory(history, userId));
    }

    private Long getHistoryKey(History history) {
        return history.getTimestamp().toInstant(ZoneOffset.UTC).toEpochMilli();
    }

    private HistoryDTO saveNewHistory(UserHistory userHistory, History newHistory, Long newKey) {
        Map<Long, History> histories = userHistory.getHistories();
        if (!histories.containsKey(newKey)) {
            newHistory.setId(newKey);
            histories.put(newKey, newHistory);
            userHistory.setHistories(histories);
            UserHistory updatedUserHistory = repository.save(userHistory);
            return getHistoryDTO(newKey, updatedUserHistory);
        } else {
            return saveNewHistory(userHistory, newHistory, newKey + 1);
        }
    }

    private HistoryDTO getHistoryDTO(Long key, UserHistory userHistory) {
        return mapper.toHistoryDTO(userHistory.getHistories().get(key));
    }

    private HistoryDTO creteNewUserHistory(History history, String userId) {
        UserHistory newUserHistory = new UserHistory();
        newUserHistory.setId(sequenceGeneratorService.generateSequence(UserHistory.SEQUENCE_NAME));
        newUserHistory.setUserId(userId);
        Long key = getHistoryKey(history);
        history.setId(key);
        newUserHistory.setHistories(Map.of(key, history));
        return getHistoryDTO(key, repository.save(newUserHistory));
    }
}
