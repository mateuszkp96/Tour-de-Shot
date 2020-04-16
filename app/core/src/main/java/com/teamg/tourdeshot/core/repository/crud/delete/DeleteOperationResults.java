package com.teamg.tourdeshot.core.repository.crud.delete;

public class DeleteOperationResults {
    private static final DeleteOperationResult SUCCESS = new DeleteOperationResultSuccess();
    private static final DeleteOperationResult NOT_FOUND = new DeleteOperationResultNotFound();

    public static DeleteOperationResult success() {
        return SUCCESS;
    }

    public static DeleteOperationResult notFound() {
        return NOT_FOUND;
    }

    public static DeleteOperationResult failure(String cause) {
        return new DeleteOperationResultFailure(cause);
    }
}
