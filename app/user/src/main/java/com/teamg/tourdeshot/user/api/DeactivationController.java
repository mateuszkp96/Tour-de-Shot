package com.teamg.tourdeshot.user.api;

import com.teamg.tourdeshot.user.service.DeactivationEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deactivation")
public class DeactivationController {

    private final DeactivationEventService deactivationEventService;

    @Autowired
    public DeactivationController(DeactivationEventService deactivationEventService) {
        this.deactivationEventService = deactivationEventService;
    }

    @PostMapping
    public String deactivationEvent() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        deactivationEventService.saveDeactivationEvent(username);
        return "deactivation";
    }

}
