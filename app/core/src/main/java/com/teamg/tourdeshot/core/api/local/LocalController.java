package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.local.request.LocalRequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/local")
public class LocalController {

    @GetMapping("/{id}")
    LocalDTO findLocalById(@PathVariable Long id) {
        return new LocalDTO(id);
    }

    @GetMapping
    List<LocalDTO> findAllLocalsByFilter(@RequestBody LocalRequestBody requestBody) {
        List<LocalDTO> list = new ArrayList<>();
        return list;
    }

}
