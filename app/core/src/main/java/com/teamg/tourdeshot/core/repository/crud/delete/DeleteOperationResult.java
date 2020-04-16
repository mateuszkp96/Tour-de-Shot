package com.teamg.tourdeshot.core.repository.crud.delete;

import com.teamg.tourdeshot.core.repository.crud.Status;

public interface DeleteOperationResult {
    Status getStatus();

    String getMessage();
}