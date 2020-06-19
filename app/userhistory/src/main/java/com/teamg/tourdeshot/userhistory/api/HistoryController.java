package com.teamg.tourdeshot.userhistory.api;

import com.teamg.tourdeshot.userhistory.api.dto.history.HistoryDTO;
import com.teamg.tourdeshot.userhistory.service.HistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/{userId}") // TODO read user id from headers
    public Page<HistoryDTO> getHistory(@PathVariable(name = "userId") String userId,
                                       @RequestParam(value = "page", required = false) Integer page,
                                       @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        return service.getHistory(userId, createPageRequest(page, pageSize));
    }

    private PageRequest createPageRequest(Integer page, Integer pageSize) {
        return PageRequest.of(Objects.requireNonNullElse(page, defaultPage),
                Objects.requireNonNullElse(pageSize, defaultPageSize));
    }

}
