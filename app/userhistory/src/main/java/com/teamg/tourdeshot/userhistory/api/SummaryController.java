package com.teamg.tourdeshot.userhistory.api;

import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryDTO;
import com.teamg.tourdeshot.userhistory.api.dto.summary.SummaryPostDTO;
import com.teamg.tourdeshot.userhistory.model.UserHistory;
import com.teamg.tourdeshot.userhistory.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
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

    @PostMapping("/{userId}") // TODO read user id from headers
    public ResponseEntity<HistoryDTO> addSummary(@PathVariable(name = "userId") String userId,
                                                 @RequestBody SummaryPostDTO dto) {
        return service.addSummaryToHistory(dto, userId);
    }

}
