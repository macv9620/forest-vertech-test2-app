package com.vertech.forest.web.controller.exceptions;

public class CheckDataCustomException extends RuntimeException {
    public CheckDataCustomException(String errorMessage) {
        super(errorMessage);
    }
}