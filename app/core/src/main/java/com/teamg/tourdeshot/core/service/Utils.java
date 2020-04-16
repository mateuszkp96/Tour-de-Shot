package com.teamg.tourdeshot.core.service;

import com.teamg.tourdeshot.core.repository.crud.delete.DeleteOperationResult;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class Utils {

    public static ResponseEntity<String> deleteOperationResultToResponseEntity(DeleteOperationResult result, Long id) {
        switch (result.getStatus()) {
            case SUCCESS:
                return new ResponseEntity<>("", HttpStatus.NO_CONTENT);
            case NOT_FOUND:
                return new ResponseEntity<>("Resource with id: " + id + " not found", HttpStatus.NOT_FOUND);
            default:
                return new ResponseEntity<>(result.getMessage(), HttpStatus.CONFLICT);
        }
    }
}
