package com.tecsoporte.tecsoporte.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tecsoporte.tecsoporte.exception.RecursoNoEncontradoException;

import com.tecsoporte.tecsoporte.model.Empleado;
import com.tecsoporte.tecsoporte.model.SolicitudServicio;

import com.tecsoporte.tecsoporte.repository.EmpleadoRepository;
import com.tecsoporte.tecsoporte.repository.SolicitudServicioRepository;

@Service
public class SolicitudServicioServiceImpl implements SolicitudServicioService {

    private final SolicitudServicioRepository solicitudServicioRepository;

    private final EmpleadoRepository empleadoRepository;

    public SolicitudServicioServiceImpl(
            SolicitudServicioRepository solicitudServicioRepository,
            EmpleadoRepository empleadoRepository) {
        this.solicitudServicioRepository = solicitudServicioRepository;
        this.empleadoRepository = empleadoRepository;
    }

    @Override
    public List<SolicitudServicio> listarSolicitudes() {
        return solicitudServicioRepository.findAll();
    }

    @Override
    public SolicitudServicio buscarSolicitudPorId(Long idSolicitud) {
        return solicitudServicioRepository.findSolicitudByIdSolicitud(idSolicitud)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Solicitud no encontrada con ID: " + idSolicitud));
    }

    @Override
    public List<SolicitudServicio> listarSolicitudesPorEmpleado(Long idEmpleado) {

        if (!empleadoRepository.existsById(idEmpleado)) {
            throw new RecursoNoEncontradoException("Empleado no encontrado con ID: " + idEmpleado);
        }

        return solicitudServicioRepository.findByEmpleadoIdEmpleado(idEmpleado);
    }

    @Override
    public SolicitudServicio crearSolicitud(Long idEmpleado, SolicitudServicio solicitudServicio) {

        Empleado empleado = empleadoRepository.findById(idEmpleado)
                .orElseThrow(() -> new RecursoNoEncontradoException(
                        "Empleado no encontrado con ID: " + idEmpleado));

        solicitudServicio.setEmpleado(empleado);

        return solicitudServicioRepository.save(solicitudServicio);
    }

    @Override

    public SolicitudServicio actualizarSolicitud(Long idSolicitud, Long idEmpleado, SolicitudServicio solicitudServicio){

        SolicitudServicio solicitudExistente = buscarSolicitudPorId(idSolicitud);

        Empleado empleado = empleadoRepository.findById(idEmpleado)
            .orElseThrow(() -> new RecursoNoEncontradoException(
                "Empleado no encontrado con ID: " + idEmpleado));

        solicitudExistente.setDescripcion(solicitudServicio.getDescripcion());

        solicitudExistente.setTipoServicio(solicitudServicio.getTipoServicio());

        solicitudExistente.setEstado(solicitudServicio.getEstado());

        solicitudExistente.setFechaSolicitud(solicitudServicio.getFechaSolicitud());

        solicitudExistente.setDireccionServicio(solicitudServicio.getDireccionServicio());

        solicitudExistente.setEmpleado(empleado);

        solicitudServicioRepository.save(solicitudExistente);

        return solicitudServicioRepository.findById(idSolicitud)
        .orElseThrow(() -> new RecursoNoEncontradoException(
                "Solicitud no encontrada con ID: " + idSolicitud));
    }

    @Override
    public void eliminarSolicitud(Long idSolicitud) {

        SolicitudServicio solicitudExistente = buscarSolicitudPorId(idSolicitud);

        solicitudServicioRepository.delete(solicitudExistente);
    }
}
