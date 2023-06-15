package com.seb_pre_007.Server.user.controller;


import com.seb_pre_007.Server.user.dto.UserPostDto;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.mapper.UserMapper;
import com.seb_pre_007.Server.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
public class UserController {

    private final UserService userService;

    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }


    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody UserPostDto userPostDto){

        User user= userService.createUser(userMapper.userPostDtoToUser(userPostDto));

        return new ResponseEntity<>(HttpStatus.CREATED);

    }


}
