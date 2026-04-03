package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;


@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ex.getMessage());
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity<String> handleEmailAlreadyExist(EmailAlreadyExistException ex) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(ex.getMessage());
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<SimpleResponseDTO> handleResourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new SimpleResponseDTO(ex.getMessage(), 404));
    }

    @ExceptionHandler(UnAuthorizedException.class)
    public ResponseEntity<String> handleUnAuthorized(UnAuthorizedException ex) {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ex.getMessage());
    }

    @ExceptionHandler(ActionNotAllowedException.class)
    public ResponseEntity<SimpleResponseDTO> handleActionNotAllowed(ActionNotAllowedException ex) {
        return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .body(new SimpleResponseDTO(ex.getMessage(), 403));
    }

    @ExceptionHandler(ResourceAlreadyExistException.class)
    public ResponseEntity<SimpleResponseDTO> handleResourceAlreadyExist(ResourceAlreadyExistException ex) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(new SimpleResponseDTO(ex.getMessage(), 409));
    }
}
