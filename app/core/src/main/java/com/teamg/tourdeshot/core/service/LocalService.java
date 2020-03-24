package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.dto.LocalDTO;
import com.teamg.tourdeshot.core.dto.LocalWithDistanceDTO;
import com.teamg.tourdeshot.core.mapper.LocalMapper;
import com.teamg.tourdeshot.core.mapper.LocalWithDistanceMapper;
import com.teamg.tourdeshot.core.repository.LocalRepoProxy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalService {

    private LocalRepoProxy localRepoProxy;

    private LocalMapper localMapper;

    private LocalWithDistanceMapper localWithDistanceMapper;

    @Autowired
    public LocalService(LocalRepoProxy localRepoProxy, LocalMapper localMapper,
                        LocalWithDistanceMapper localWithDistanceMapper) {
        this.localRepoProxy = localRepoProxy;
        this.localMapper = localMapper;
        this.localWithDistanceMapper = localWithDistanceMapper;
    }

    public LocalDTO findById(Long id) {
        return localMapper.toLocalDTO(localRepoProxy.findById(id));
    }


    public List<LocalDTO> findAllByFilter() {
        return localMapper.toLocalDTOs(localRepoProxy.findAllByFilter());
    }

    public List<LocalWithDistanceDTO> findAllWithDistance() {
        return localWithDistanceMapper.toLocalDistanceDTOs(localRepoProxy.findAllWithDistance());
    }

}
