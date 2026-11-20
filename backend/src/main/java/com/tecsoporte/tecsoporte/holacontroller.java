package com.tecsoporte.tecsoporte;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class holacontroller {

    @GetMapping("/")

    public String inicio() {

        return "Hola, Spring Boot está funcionando correctamente";
    }
}
