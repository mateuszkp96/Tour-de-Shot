package com.teamg.tourdeshot.core.repository.mongo;

import com.mongodb.client.result.DeleteResult;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResults;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteResultInterpreter;

public class MongoDeleteResultInterpreter implements DeleteResultInterpreter<DeleteResult> {

    @Override
    public DeleteOperationResult read(DeleteResult value) {
        try {
            long deleteCount = value.getDeletedCount();
            if (deleteCount == 1) {
                return DeleteOperationResults.success();
            } else if (deleteCount == 0) {
                return DeleteOperationResults.notFound();
            } else {
                return DeleteOperationResults.failure("Unexpected delete count : Expected: 1, Actual: " + value.getDeletedCount());
            }
        } catch (Exception e) {
            return DeleteOperationResults.failure(e.getMessage());
        }
    }
}
