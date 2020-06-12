package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.local.domain.LocalDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalSimpleDTO;
import com.teamg.tourdeshot.core.api.local.filter.FilterRequestBody;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/local")
public class LocalController {

    private final LocalService localService;
    private Integer defaultPage;
    private Integer defaultPageSize;

    @Autowired
    public LocalController(LocalService localService,
                           @Value("${app.local.defaultPage}") Integer defaultPage,
                           @Value("${app.local.pageSize}") Integer defaultPageSize) {
        this.localService = localService;
        this.defaultPage = Objects.requireNonNullElse(defaultPage, 0);
        this.defaultPageSize = Objects.requireNonNullElse(defaultPageSize, 5);
    }

    @GetMapping("/{id}")
    public LocalDTO findLocalById(@PathVariable Long id) {
        return localService.findLocalById(id);
    }

    @GetMapping
    public Page<LocalSimpleDTO> findAllLocals(@RequestParam(value = "page", required = false) Integer page,
                                              @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        return localService.findAllPageable(createPageRequest(page, pageSize));
    }

    @GetMapping("/distance")
    public Page<LocalSimpleDTO> findAllLocalsByDistance(@RequestParam BigDecimal lat, @RequestParam BigDecimal lon) {
        return localService.findAllSortedByDistance(PageRequest.of(0, 5), new Coordinates(lat, lon));
    }

    @PostMapping("/filter")
    public Page<LocalSimpleDTO> filterLocals(@RequestBody FilterRequestBody requestBody,
                                             @RequestParam(value = "page", required = false) Integer page,
                                             @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        return localService.filterLocals(requestBody, createPageRequest(page, pageSize));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        return localService.deleteById(id);
    }

    private PageRequest createPageRequest(Integer page, Integer pageSize) {
        return PageRequest.of(Objects.requireNonNullElse(page, defaultPage),
                Objects.requireNonNullElse(pageSize, defaultPageSize));
    }

}
