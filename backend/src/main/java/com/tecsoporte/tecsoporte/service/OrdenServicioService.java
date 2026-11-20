package com.tecsoporte.tecsoporte.service;

import com.tecsoporte.tecsoporte.dto.OrdenServicioResponse;

public interface OrdenServicioService {

    OrdenServicioResponse obtenerOrdenPorSolicitud(
            Long idSolicitud
    );
}
