package com.example.ReaderWorld.controller;


import com.example.ReaderWorld.model.UserDTO;
import com.example.ReaderWorld.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserService userService;


    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> post(@RequestBody UserDTO user) throws ExecutionException, InterruptedException {
        return ResponseEntity.ok(userService.saveUser(user));
    }

}
