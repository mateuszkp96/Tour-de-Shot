package com.teamg.tourdeshot.userhistory.api;

import com.teamg.tourdeshot.userhistory.api.dto.SummaryPostDTO;
import com.teamg.tourdeshot.userhistory.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/summary")
public class SummaryController {

    private final SummaryService service;

    @Autowired
    public SummaryController(SummaryService service) {
        this.service = service;
    }

    @PostMapping
    public String addSummary(@RequestBody SummaryPostDTO dto) {
        return service.addSummary(dto);
    }

}
