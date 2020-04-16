package com.teamg.tourdeshot.core.repository.crud;

import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;

import java.util.List;
import java.util.Optional;

public interface CrudRepo<T, ID> {
    Optional<T> findById(ID id);

    List<T> findAll();

    T save(T entity);

    DeleteOperationResult deleteById(ID id);
}
