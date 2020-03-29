package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.local.request.FilterRequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    @PostMapping
    List<LocalDTO> filterLocals(@RequestBody FilterRequestBody requestBody) {
        List<LocalDTO> list = new ArrayList<>();
        list.add(new LocalDTO(1L));
        return list;
    }

}
