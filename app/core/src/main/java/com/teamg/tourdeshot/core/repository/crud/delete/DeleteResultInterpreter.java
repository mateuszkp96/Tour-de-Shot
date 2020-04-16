package com.teamg.tourdeshot.core.repository.crud.delete;

public interface DeleteResultInterpreter<T> {

    DeleteOperationResult read(T value);
}
