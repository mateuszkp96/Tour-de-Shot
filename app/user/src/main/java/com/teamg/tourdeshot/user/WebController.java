package com.teamg.tourdeshot.user;


import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebController {


    @GetMapping(path = "/api/open")
    public String index() {
      return "externa";
    }

    @GetMapping(path = "/api/customers")
    @Secured("ROLE_Member")
    public String customers() {
        return "customers";
    }

}