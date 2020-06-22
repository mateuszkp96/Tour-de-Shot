package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.local.domain.LocalDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalPostDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalSimpleDTO;
import com.teamg.tourdeshot.core.api.local.domain.LocalUpdateDTO;
import com.teamg.tourdeshot.core.api.local.filter.FilterRequestBody;
import com.teamg.tourdeshot.core.model.Local;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/filter")
    public Page<LocalSimpleDTO> filterLocals(@RequestBody FilterRequestBody requestBody,
                                             @RequestParam(value = "page", required = false) Integer page,
                                             @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        return localService.filterLocals(requestBody, createPageRequest(page, pageSize));
    }

    @PostMapping("/{ownerId}")
    public Local saveLocal(@RequestBody LocalPostDTO local, @PathVariable String ownerId) {
        return localService.addLocal(local, ownerId);
    }

    @PutMapping("/{id}")
    public LocalDTO updateLocal(@PathVariable Long id, @RequestBody LocalUpdateDTO local) {
        return localService.updateLocal(id, local);
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
