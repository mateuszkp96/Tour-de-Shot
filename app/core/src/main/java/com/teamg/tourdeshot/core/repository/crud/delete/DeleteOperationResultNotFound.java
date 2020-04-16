package com.teamg.tourdeshot.core.repository.crud.delete;

import com.teamg.tourdeshot.core.repository.crud.Status;

final class DeleteOperationResultNotFound implements DeleteOperationResult {

    @Override
    public Status getStatus() {
        return Status.NOT_FOUND;
    }

    @Override
    public String getMessage() {
        return "Resource not found";
    }
}
