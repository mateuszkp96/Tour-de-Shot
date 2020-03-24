package com.teamg.tourdeshot.core.controller;

import com.teamg.tourdeshot.core.dto.LocalDTO;
import com.teamg.tourdeshot.core.dto.LocalWithDistanceDTO;
import com.teamg.tourdeshot.core.filter.Filter;
import com.teamg.tourdeshot.core.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/local")
public class LocalController {

    private LocalService localService;

    @Autowired
    public LocalController(LocalService localService) {
        this.localService = localService;
    }

    @GetMapping("/{id}")
    LocalDTO findLocalById(@PathVariable Long id) {
        return localService.findById(id);
    }

    @GetMapping
    List<LocalDTO> findAllLocalsByFilter() {
        return localService.findAllByFilter();
    }

    @GetMapping("/distance")
    List<LocalWithDistanceDTO> findAllLocalsWithDistance() {
        return localService.findAllWithDistance();
    }


}
