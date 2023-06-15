package com.seb_pre_007.auth;

import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import lombok.extern.java.Log;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class LoginController {

    private final JwtTokenizer jwtTokenizer;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    private final UserService userService;
    @Autowired
    public LoginController (JwtTokenizer jwtTokenizer, AuthenticationManager authenticationManager, UserDetailsService userDetailsService, UserService userService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    @GetMapping("/login")
    public String login() {
        return "login_form";
    }




}
