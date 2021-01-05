package com.example.ReaderWorld.exception;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class MyExceptionHandler {
    public static final Logger LOGGER = LoggerFactory.getLogger(MyExceptionHandler.class);

    //We can extend as we need more exceptions.
    @ExceptionHandler(Throwable.class)
    public ResponseEntity<?> handleRunTimeException(HttpServletRequest request, Throwable t){
        //Logs the real exception for the server admins.
        LOGGER.error(t.getMessage(), t);
        Map<String, String> map = new HashMap<>();
        map.put("Error", "Unknown issue");
        //Sends 500 to front-end.
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handeException(HttpServletRequest request, IllegalArgumentException e){
        LOGGER.error(e.getMessage(), e);
        Map<String, String> map = new HashMap<>();
        map.put("Error", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }



}
