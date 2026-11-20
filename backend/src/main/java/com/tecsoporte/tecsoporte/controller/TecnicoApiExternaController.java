package com.tecsoporte.tecsoporte.controller;

import com.tecsoporte.tecsoporte.service.TecnicoApiExternaService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/publica/tecnicos-externos")
public class TecnicoApiExternaController {

    private final TecnicoApiExternaService tecnicoApiExternaService;

    public TecnicoApiExternaController(TecnicoApiExternaService tecnicoApiExternaService) {
        this.tecnicoApiExternaService = tecnicoApiExternaService;
    }

    @GetMapping
    public String obtenerTecnicosExternos() {
        return tecnicoApiExternaService.obtenerUsuariosExternos();
    }
}