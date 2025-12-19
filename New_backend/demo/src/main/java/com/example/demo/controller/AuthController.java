package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import com.example.demo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody User user) {
        User saved = userService.saveUser(user);
        return Map.of("id", saved.getId(), "username", saved.getUsername());
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        // authenticate (this will check password against encoded pass)
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        // if no exception, generate token
        String token = jwtUtil.generateToken(user.getUsername());
        return Map.of("token", token);
    }

    @GetMapping("/hello")
    public String publicHello() {
        return "public endpoint";
    }
}
