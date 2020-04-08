package com.teamg.tourdeshot.core.service.starter;

import com.teamg.tourdeshot.core.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

public class LocalServiceStarter {

    private final LocalService localService;

    @Autowired
    public LocalServiceStarter(LocalService localService) {
        this.localService = localService;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void onStart() {
        // Sample data
    }
}
