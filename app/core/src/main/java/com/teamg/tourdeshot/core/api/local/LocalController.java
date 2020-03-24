package com.teamg.tourdeshot.core.api.local;

import com.teamg.tourdeshot.core.api.request.LocalRequestBody;
import org.springframework.web.bind.annotation.*;

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
