package com.tecsoporte.tecsoporte.controller;

import com.tecsoporte.tecsoporte.dto.OrdenServicioResponse;
import com.tecsoporte.tecsoporte.service.OrdenServicioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ordenes")
public class OrdenServicioController {

    private final OrdenServicioService ordenServicioService;

    public OrdenServicioController(
            OrdenServicioService ordenServicioService) {

        this.ordenServicioService = ordenServicioService;
    }

    @GetMapping("/{idSolicitud}")
    public ResponseEntity<OrdenServicioResponse> obtenerOrdenServicio(

            @PathVariable Long idSolicitud) {

        OrdenServicioResponse orden =
                ordenServicioService
                        .obtenerOrdenPorSolicitud(idSolicitud);

        return ResponseEntity.ok(orden);
    }

}