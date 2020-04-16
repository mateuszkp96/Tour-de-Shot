package com.teamg.tourdeshot.core.repository.mongo;

import com.mongodb.client.result.DeleteResult;
import com.teamg.tourdeshot.core.repository.crud.Status;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;
import com.teamg.tourdeshot.core.repository.crud.delete.DeleteResultInterpreter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class MongoDeleteResultInterpreterTest {

    DeleteResultInterpreter<DeleteResult> interpreter = new MongoDeleteResultInterpreter();

    @Test
    void shouldInterpretSuccess() {
        long deletedCount = 1;
        DeleteResult mongoDeleteResult = DeleteResult.acknowledged(deletedCount);

        DeleteOperationResult result = interpreter.read(mongoDeleteResult);

        Assertions.assertEquals(result.getStatus(), Status.SUCCESS);
    }

    @Test
    void shouldInterpretNotFound() {
        long deletedCount = 0;
        DeleteResult mongoDeleteResult = DeleteResult.acknowledged(deletedCount);

        DeleteOperationResult result = interpreter.read(mongoDeleteResult);

        Assertions.assertEquals(result.getStatus(), Status.NOT_FOUND);
    }

    @Test
    void shouldInterpretFailure() {
        DeleteResult mongoDeleteResult = DeleteResult.unacknowledged();

        DeleteOperationResult result = interpreter.read(mongoDeleteResult);

        Assertions.assertEquals(result.getStatus(), Status.FAILURE);
    }
}