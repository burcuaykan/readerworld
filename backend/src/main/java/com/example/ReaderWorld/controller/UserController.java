package com.example.ReaderWorld.controller;


import com.example.ReaderWorld.model.UserDTO;
import com.example.ReaderWorld.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/users")
public class UserController {
    //dependency injection
    @Autowired
    UserService userService;


    @GetMapping("/user")
    @ResponseBody
    public ResponseEntity<?> getUser(@RequestParam(name="email") String email) throws ExecutionException, InterruptedException {
        UserDTO user = userService.getUser(email);
        return ResponseEntity.ok(user);
    }

    @GetMapping("")
    @ResponseBody
    public ResponseEntity<?> getUser() throws ExecutionException, InterruptedException {
        UserDTO user = userService.getUser(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.ok(user);
    }

    @PostMapping("")
    @ResponseBody
    public ResponseEntity<?> post(@RequestBody UserDTO user) throws ExecutionException, InterruptedException {
        boolean savedUser = userService.saveUser(user);
        if(savedUser){
            return ResponseEntity.ok(new Object() {
                public String saved = "true";
            });
        }
        else{
            //Meaning user is already saved
            return ResponseEntity.ok(new Object() {
                public String saved = "false";
            });
        }
    }

}
