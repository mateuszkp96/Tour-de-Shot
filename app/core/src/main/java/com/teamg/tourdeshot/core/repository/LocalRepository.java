package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.model.Local;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface LocalRepository  {
    Local findById(Long localId);

    List<Local> findAll();

    Page<Local> findAllPageable(Pageable pageable);

    Local addLocal(Local local);

    void deleteById(Long localId);
}
