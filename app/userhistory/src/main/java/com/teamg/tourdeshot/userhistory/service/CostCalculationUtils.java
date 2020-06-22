package com.teamg.tourdeshot.userhistory.service;

import com.teamg.tourdeshot.userhistory.model.HistoryItem;
import com.teamg.tourdeshot.userhistory.model.ProductSummary;

import java.math.BigDecimal;
import java.util.List;

public class CostCalculationUtils {

    public static BigDecimal calculateCost(List<HistoryItem> items) {
        return items.stream()
                .map(item -> calculateProductCost(item.getProducts()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public static BigDecimal calculateProductCost(List<ProductSummary> productSummaries) {
        return productSummaries.stream()
                .map(productSummary -> productSummary.getPrice().multiply(BigDecimal.valueOf(productSummary.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

}
