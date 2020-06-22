package com.teamg.tourdeshot.user;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;

@RestController
public class WebController {

@Autowired
private RestTemplate restTemplate;

    @GetMapping(path = "/api/open")
    public String index() {
      return "externa";
    }

    @GetMapping(path = "/api/customers")
     @Secured("ROLE_Member") //coś takiego nie działa
    public String customers(Principal principal, Model model) {
        return "customers";
    }






}