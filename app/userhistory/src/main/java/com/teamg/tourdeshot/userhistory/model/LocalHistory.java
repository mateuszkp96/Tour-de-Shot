package com.teamg.tourdeshot.userhistory.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocalHistory {

    private Long orderNumber;

    private String localId;

    private List<Product> products;
}
