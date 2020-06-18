package com.teamg.tourdeshot.core.repository;

import com.teamg.tourdeshot.core.api.local.filter.FilterRequestBody;
import com.teamg.tourdeshot.core.model.Local;
import com.teamg.tourdeshot.core.model.LocalWithDistance;
import com.teamg.tourdeshot.core.repository.crud.CrudRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface LocalRepository extends CrudRepo<Local, Long> {

    Page<Local> findAllPageable(Pageable pageable);

    Page<LocalWithDistance> filterLocals(Pageable pageable, FilterRequestBody requestBody);
}
