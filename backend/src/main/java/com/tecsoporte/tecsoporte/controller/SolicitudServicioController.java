package com.tecsoporte.tecsoporte.controller;

import com.tecsoporte.tecsoporte.model.Empleado;
import com.tecsoporte.tecsoporte.model.SolicitudServicio;
import com.tecsoporte.tecsoporte.repository.EmpleadoRepository;
import com.tecsoporte.tecsoporte.service.SolicitudServicioService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudServicioController {

    private final SolicitudServicioService solicitudServicioService;
    private final EmpleadoRepository empleadoRepository;

    public SolicitudServicioController(SolicitudServicioService solicitudServicioService,
                                       EmpleadoRepository empleadoRepository) {
        this.solicitudServicioService = solicitudServicioService;
        this.empleadoRepository = empleadoRepository;
    }

    @GetMapping
    public List<SolicitudServicio> listarSolicitudes(Authentication authentication) {
        if (esEmpleado(authentication)) {
            Empleado empleado = empleadoActual(authentication);
            return solicitudServicioService.listarSolicitudesPorEmpleado(empleado.getIdEmpleado());
        }
        return solicitudServicioService.listarSolicitudes();
    }

    @GetMapping("/{idSolicitud}")
    public SolicitudServicio buscarSolicitudPorId(@PathVariable Long idSolicitud, Authentication authentication) {
        SolicitudServicio solicitud = solicitudServicioService.buscarSolicitudPorId(idSolicitud);
        validarAccesoEmpleado(authentication, solicitud);
        return solicitud;
    }

    @GetMapping("/empleado/{idEmpleado}")
    public List<SolicitudServicio> listarSolicitudesPorEmpleado(@PathVariable Long idEmpleado,
                                                                 Authentication authentication) {
        if (esEmpleado(authentication)) {
            validarEmpleadoActual(authentication, idEmpleado);
        }
        return solicitudServicioService.listarSolicitudesPorEmpleado(idEmpleado);
    }

    @PostMapping("/empleado/{idEmpleado}")
    public SolicitudServicio crearSolicitud(@PathVariable Long idEmpleado,
                                            @Valid @RequestBody SolicitudServicio solicitudServicio,
                                            Authentication authentication) {
        if (esEmpleado(authentication)) {
            validarEmpleadoActual(authentication, idEmpleado);
        }
        return solicitudServicioService.crearSolicitud(idEmpleado, solicitudServicio);
    }

    @PutMapping("/{idSolicitud}/empleado/{idEmpleado}")
    public ResponseEntity<String> actualizarSolicitud(@PathVariable Long idSolicitud,
                                                      @PathVariable Long idEmpleado,
                                                      @Valid @RequestBody SolicitudServicio solicitudServicio,
                                                      Authentication authentication) {
        SolicitudServicio existente = solicitudServicioService.buscarSolicitudPorId(idSolicitud);
        validarAccesoEmpleado(authentication, existente);
        if (esEmpleado(authentication)) {
            validarEmpleadoActual(authentication, idEmpleado);
        }
        solicitudServicioService.actualizarSolicitud(idSolicitud, idEmpleado, solicitudServicio);
        return ResponseEntity.ok("Solicitud actualizada correctamente");
    }

    @DeleteMapping("/{idSolicitud}")
    public ResponseEntity<Void> eliminarSolicitud(@PathVariable Long idSolicitud) {
        solicitudServicioService.eliminarSolicitud(idSolicitud);
        return ResponseEntity.noContent().build();
    }

    private boolean esEmpleado(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_EMPLEADO".equals(a.getAuthority()));
    }

    private Empleado empleadoActual(Authentication authentication) {
        return empleadoRepository.findByCorreoElectronicoIgnoreCase(authentication.getName())
                .orElseThrow(() -> new IllegalArgumentException("El usuario autenticado no está asociado a un empleado."));
    }

    private void validarEmpleadoActual(Authentication authentication, Long idEmpleado) {
        if (!empleadoActual(authentication).getIdEmpleado().equals(idEmpleado)) {
            throw new org.springframework.security.access.AccessDeniedException("No puedes operar solicitudes de otro empleado.");
        }
    }

    private void validarAccesoEmpleado(Authentication authentication, SolicitudServicio solicitud) {
        if (esEmpleado(authentication)) {
            Empleado actual = empleadoActual(authentication);
            if (solicitud.getEmpleado() == null || !actual.getIdEmpleado().equals(solicitud.getEmpleado().getIdEmpleado())) {
                throw new org.springframework.security.access.AccessDeniedException("No tienes acceso a esta solicitud.");
            }
        }
    }
}
