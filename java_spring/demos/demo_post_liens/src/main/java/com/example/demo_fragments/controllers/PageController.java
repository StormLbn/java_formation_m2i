package com.example.demo_fragments.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/page")
    public String getPage() {
        return "page";
    }
}
