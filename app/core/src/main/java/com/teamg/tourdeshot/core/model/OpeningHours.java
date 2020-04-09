package com.teamg.tourdeshot.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpeningHours {

    private Weekday weekday;

    private String open;

    private String close;
}
