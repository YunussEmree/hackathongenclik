package com.just3dev.sosyalizbiz.activity;

public class ActivityAlreadyExistsException extends RuntimeException {
    public ActivityAlreadyExistsException(String message) {
        super(message);
    }
}
