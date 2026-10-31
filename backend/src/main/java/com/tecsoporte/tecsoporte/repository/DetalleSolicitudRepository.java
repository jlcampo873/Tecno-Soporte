package com.tecsoporte.tecsoporte.repository;

import com.tecsoporte.tecsoporte.model.DetalleSolicitud;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DetalleSolicitudRepository
        extends JpaRepository<DetalleSolicitud, Long> {

    @Override
    @EntityGraph(attributePaths = {
            "solicitud",
            "servicio",
            "tecnico"
    })
    List<DetalleSolicitud> findAll();

    @EntityGraph(attributePaths = {
            "solicitud",
            "servicio",
            "tecnico"
    })
    Optional<DetalleSolicitud> findDetalleByIdDetalle(
            Long idDetalle
    );

    @EntityGraph(attributePaths = {
            "solicitud",
            "servicio",
            "tecnico"
    })
    List<DetalleSolicitud> findBySolicitudIdSolicitud(
            Long idSolicitud
    );

    @EntityGraph(attributePaths = {"solicitud", "servicio", "tecnico"})
    List<DetalleSolicitud> findByServicioIdServicio(Long idServicio);

    @EntityGraph(attributePaths = {"solicitud", "servicio", "tecnico"})
    List<DetalleSolicitud> findByTecnicoIdTecnico(Long idTecnico);
}