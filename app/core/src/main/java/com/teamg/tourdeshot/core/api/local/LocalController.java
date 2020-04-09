package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.local.request.FilterRequestBody;
import com.teamg.tourdeshot.core.model.Coordinates;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.Menu;
import com.teamg.tourdeshot.core.model.Product;
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
    public LocalDTO findLocalById(@PathVariable Long id) {
        return localService.findLocalById(id);
    }

    @GetMapping
    public List<LocalDTO> findAllLocals() {
        return localService.findAllLocals();
    }

    @GetMapping("/distance")
    public List<LocalDTO> findAllLocalsByDistance(@RequestParam BigDecimal lat, @RequestParam BigDecimal lon) {
        return localService.findAllSortedByDistance(new Coordinates(lat, lon));
    }

    @PostMapping("/filter")
    public List<LocalDTO> filterLocals(@RequestBody FilterRequestBody requestBody) {
        return null;
    }

    @PostMapping
    public Local addLocal(@RequestBody LocalPostDTO local) {
        return localService.addLocal(local);
    }

    @PostMapping("/menu")
    public Local addMenuToLocal(@RequestBody Menu menu, @RequestParam Long localId) {
        return localService.addMenuToLocal(menu, localId);
    }

    @PostMapping("/product")
    public Local addProductToLocal(@RequestBody Product product, @RequestParam Long localId) {
        return localService.addProductToLocal(product, localId);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        localService.deleteById(id);
    }

    @DeleteMapping()
    public void deleteAll() {
        localService.deleteAll();
    }

}
