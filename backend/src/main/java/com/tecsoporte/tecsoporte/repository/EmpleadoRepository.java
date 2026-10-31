package com.tecsoporte.tecsoporte.repository;

import com.tecsoporte.tecsoporte.model.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Optional<Empleado> findByCorreoElectronicoIgnoreCase(String correoElectronico);
}
