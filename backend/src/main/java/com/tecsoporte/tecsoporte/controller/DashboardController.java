package com.tecsoporte.tecsoporte.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecsoporte.tecsoporte.dto.DashboardResumenDTO;
import com.tecsoporte.tecsoporte.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/resumen")
    public ResponseEntity<DashboardResumenDTO> obtenerResumen() {

        DashboardResumenDTO resumen = dashboardService.obtenerResumen();

        return ResponseEntity.ok(resumen);
    }
}