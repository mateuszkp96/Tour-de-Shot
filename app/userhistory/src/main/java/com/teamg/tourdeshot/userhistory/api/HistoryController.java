package com.teamg.tourdeshot.userhistory.api;

import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryDTO;
import com.teamg.tourdeshot.userhistory.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/userhistory")
public class HistoryController {

    private final HistoryService service;
    private final Integer defaultPage;
    private final Integer defaultPageSize;

    @Autowired
    public HistoryController(HistoryService service,
                             @Value("${app.history.defaultPage}") Integer defaultPage,
                             @Value("${app.history.pageSize}") Integer defaultPageSize) {
        this.service = service;
        this.defaultPage = Objects.requireNonNullElse(defaultPage, 0);
        this.defaultPageSize = Objects.requireNonNullElse(defaultPageSize, 5);
    }

    @GetMapping
    public Page<HistoryDTO> getHistory(
                                       @RequestParam(value = "page", required = false) Integer page,
                                       @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        JwtAuthenticationToken jwt = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        return service.getHistory(jwt.getName(), createPageRequest(page, pageSize));
    }

    private PageRequest createPageRequest(Integer page, Integer pageSize) {
        return PageRequest.of(Objects.requireNonNullElse(page, defaultPage),
                Objects.requireNonNullElse(pageSize, defaultPageSize));
    }

}
