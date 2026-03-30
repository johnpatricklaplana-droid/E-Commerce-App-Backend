package com.example.demo.exceptions;

public class ActionNotAllowedException extends RuntimeException {
    
    public ActionNotAllowedException(String message) {
        super(message);
    }

}
