package com.tecsoporte.tecsoporte.controller;

import com.tecsoporte.tecsoporte.service.ApiPublicaService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/publica")
public class ApiPublicaController {

    private final ApiPublicaService apiPublicaService;

    public ApiPublicaController(ApiPublicaService apiPublicaService) {
        this.apiPublicaService = apiPublicaService;
    }

    @GetMapping("/usuarios")
    public String obtenerUsuariosExternos() {
        return apiPublicaService.obtenerUsuariosExternos();
    }
}