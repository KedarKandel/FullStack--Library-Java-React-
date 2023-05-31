package com.rest_api.fs14backend.controller;

import com.rest_api.fs14backend.dto.AuthRequestDto;
import com.rest_api.fs14backend.entity.User;
import com.rest_api.fs14backend.serviceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/all")
    public List<User> findAll(){
        return userService.findAll();
    }

    @PostMapping("/signin")
    public String login(@RequestBody AuthRequestDto authRequestDto){

        return userService.login(authRequestDto);
    }

    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return userService.signup(user);
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable UUID id){
        return userService.getUserById(id);
    }


}
