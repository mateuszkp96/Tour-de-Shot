package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.LocalWithDistance;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class LocalRepoProxy {

    public Local findById(Long id) {
        return new Local(id);
    }

    public List<Local> findAllByFilter() {
        List<Local> locals =  new ArrayList<>();
        locals.add(new Local(1L));
        locals.add(new Local(2L));
        return locals;
    }

    public List<LocalWithDistance> findAllWithDistance() {
        List<LocalWithDistance> localsWithDistance =  new ArrayList<>();
        localsWithDistance.add(new LocalWithDistance(1L));
        localsWithDistance.add(new LocalWithDistance(2L));
        return localsWithDistance;
    }
}
