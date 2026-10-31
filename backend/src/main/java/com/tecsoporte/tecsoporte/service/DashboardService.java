package com.tecsoporte.tecsoporte.service;

import com.tecsoporte.tecsoporte.dto.DashboardResumenDTO;

public interface DashboardService {

    /**
     * Obtiene un resumen general del sistema con los
     * principales indicadores que serán mostrados en
     * el Dashboard.
     *
     * @return DashboardResumenDTO con los indicadores del sistema.
     */
    DashboardResumenDTO obtenerResumen();

}