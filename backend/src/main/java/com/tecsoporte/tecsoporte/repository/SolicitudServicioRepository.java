package com.tecsoporte.tecsoporte.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tecsoporte.tecsoporte.model.EstadoSolicitud;
import com.tecsoporte.tecsoporte.model.SolicitudServicio;

@Repository
public interface SolicitudServicioRepository
        extends JpaRepository<SolicitudServicio, Long> {

    @Override
    @EntityGraph(attributePaths = "empleado")
    List<SolicitudServicio> findAll();

    @EntityGraph(attributePaths = "empleado")
    Optional<SolicitudServicio> findSolicitudByIdSolicitud(
            Long idSolicitud
    );

    @EntityGraph(attributePaths = "empleado")
    List<SolicitudServicio> findByEmpleadoIdEmpleado(Long idEmpleado);

    List<SolicitudServicio> findByEstado(
            EstadoSolicitud estado
    );
}