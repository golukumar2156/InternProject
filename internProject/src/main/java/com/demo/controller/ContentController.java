package com.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContentController {

    @GetMapping("/api/public")
    public String publicApi() {
        return "Anyone can access";
    }

    @GetMapping("/api/user")
    public String userApi() {
        return "This is USER role";
    }

    @GetMapping("/api/admin")
    public String adminApi() {
        return "This is ADMIN role";
    }
}