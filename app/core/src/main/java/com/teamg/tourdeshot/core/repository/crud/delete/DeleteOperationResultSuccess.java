package com.teamg.tourdeshot.core.repository.crud.delete;

import com.teamg.tourdeshot.core.repository.crud.Status;

final class DeleteOperationResultSuccess implements DeleteOperationResult {

    @Override
    public Status getStatus() {
        return Status.SUCCESS;
    }

    @Override
    public String getMessage() {
        return "Success";
    }
}
