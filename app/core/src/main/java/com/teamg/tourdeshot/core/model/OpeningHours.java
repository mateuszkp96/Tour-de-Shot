package com.teamg.tourdeshot.core.model;

import com.teamg.tourdeshot.core.enums.Weekday;
import lombok.Data;

@Data
public class OpeningHours {

    private Weekday weekday;

    private String open;

    private String close;
}
