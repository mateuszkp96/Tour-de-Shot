package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.local.domain.LocalSimpleDTO;
import com.teamg.tourdeshot.core.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/user-local")
public class UserLocalsController {

    private final LocalService localService;
    private Integer defaultPage;
    private Integer defaultPageSize;

    @Autowired
    public UserLocalsController(LocalService localService,
                                @Value("${app.local.defaultPage}") Integer defaultPage,
                                @Value("${app.local.pageSize}") Integer defaultPageSize) {
        this.localService = localService;
        this.defaultPage = Objects.requireNonNullElse(defaultPage, 0);
        this.defaultPageSize = Objects.requireNonNullElse(defaultPageSize, 5);
    }

    @GetMapping
    public Page<LocalSimpleDTO> findAllLocalsByUser(@RequestParam(value = "page", required = false) Integer page,
                                                    @RequestParam(value = "pageSize", required = false) Integer pageSize) {
        JwtAuthenticationToken jwt = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        return localService.findAllLocalsByUser(createPageRequest(page, pageSize), jwt.getName());
    }

    private PageRequest createPageRequest(Integer page, Integer pageSize) {
        return PageRequest.of(Objects.requireNonNullElse(page, defaultPage),
                Objects.requireNonNullElse(pageSize, defaultPageSize));
    }
}
