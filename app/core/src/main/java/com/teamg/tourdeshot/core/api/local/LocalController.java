package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.local.request.FilterRequestBody;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.service.LocalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/local")
public class LocalController {

    private final LocalService localService;

    @Autowired
    public LocalController(LocalService localService) {
        this.localService = localService;
    }

    @GetMapping("/{id}")
    LocalDTO findLocalById(@PathVariable Long id) {
        return localService.findLocalById(id);
    }

    @PostMapping
    List<LocalDTO> filterLocals(@RequestBody FilterRequestBody requestBody) {
        List<LocalDTO> list = new ArrayList<>();
        list.add(createDefault(1L));
        return list;
    }

    @PostMapping
    Local addLocal(@RequestBody LocalPostDTO local) {
        return localService.addLocal(local);
    }

    @PostMapping("/{id}")
    Menu addMenuToLocal(@RequestBody Menu menu, @PathVariable Long id) {
        return localService.addMenuToLocal(menu, id);
    }

    @GetMapping
    public List<LocalDTO> findAllLocals() {
        return localService.findAllLocals();
    }

    @GetMapping("/distance")
    public List<LocalDTO> findAllLocalsByDistance(@RequestParam BigDecimal lat, @RequestParam BigDecimal lon) {
        return localService.findAllSortedByDistance(new Coordinates(lat, lon));
    }

    @DeleteMapping("/{id}")
    public void deleteAll(@PathVariable Long id) {
        localService.deleteById(id);
    }

    @DeleteMapping()
    public void deleteAll() {
        localService.deleteAll();
    }

    private LocalDTO createDefault(Long id) {
        return new LocalDTO(id, "localName", new Coordinates(new BigDecimal("52.228337"), new BigDecimal("21.013993")), BigDecimal.valueOf(50.00));
    }

}
