package com.teamg.tourdeshot.userhistory.api;

import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryDTO;
import com.teamg.tourdeshot.userhistory.api.dto.summary.SummaryPostDTO;
import com.teamg.tourdeshot.userhistory.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
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
    public ResponseEntity<HistoryDTO> addSummary(@RequestBody SummaryPostDTO dto) {
        JwtAuthenticationToken jwt = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        return service.addSummaryToHistory(dto, jwt.getName());
    }

}
