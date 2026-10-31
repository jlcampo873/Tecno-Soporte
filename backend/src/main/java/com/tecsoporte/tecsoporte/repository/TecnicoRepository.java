package com.tecsoporte.tecsoporte.repository;

import com.tecsoporte.tecsoporte.model.Tecnico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TecnicoRepository extends JpaRepository<Tecnico, Long> {

    Optional<Tecnico> findByCorreo(String correo);

    boolean existsByCorreo(String correo);
}