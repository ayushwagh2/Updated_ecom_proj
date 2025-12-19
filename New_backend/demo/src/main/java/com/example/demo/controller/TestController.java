package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/secure/hi")
    public String secureHi() {
        return "Hello authenticated user!";
    }
}
