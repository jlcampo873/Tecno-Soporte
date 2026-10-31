package com.tecsoporte.tecsoporte.service;

import java.util.List;

import com.tecsoporte.tecsoporte.model.SolicitudServicio;

public interface SolicitudServicioService {

    List<SolicitudServicio> listarSolicitudes();

    SolicitudServicio buscarSolicitudPorId(Long idSolicitud);

    List<SolicitudServicio> listarSolicitudesPorEmpleado(Long idEmpleado);

    SolicitudServicio crearSolicitud(Long idEmpleado, SolicitudServicio solicitudServicio);

    SolicitudServicio actualizarSolicitud(Long idSolicitud, Long idEmpleado, SolicitudServicio solicitudServicio);

    void eliminarSolicitud(Long idSolicitud);
}
