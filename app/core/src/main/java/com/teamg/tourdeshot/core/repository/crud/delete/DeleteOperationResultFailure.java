package com.teamg.tourdeshot.core.repository.crud.delete;

import com.teamg.tourdeshot.core.repository.crud.Status;
import lombok.Getter;

@Getter
final class DeleteOperationResultFailure implements DeleteOperationResult {
    private final String message;

    public DeleteOperationResultFailure(String message) {
        this.message = message;
    }

    @Override
    public Status getStatus() {
        return Status.FAILURE;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
