package com.tecsoporte.tecsoporte.controller;

import com.tecsoporte.tecsoporte.model.Tecnico;
import com.tecsoporte.tecsoporte.service.TecnicoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tecnicos")
public class TecnicoController {

    private final TecnicoService tecnicoService;

    public TecnicoController(TecnicoService tecnicoService) {
        this.tecnicoService = tecnicoService;
    }

    @GetMapping
    public List<Tecnico> listarTecnicos() {
        return tecnicoService.listarTecnicos();
    }

    @GetMapping("/{idTecnico}")
    public ResponseEntity<Tecnico> buscarPorId(@PathVariable Long idTecnico) {
        return tecnicoService.buscarPorId(idTecnico)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tecnico crearTecnico(@Valid @RequestBody Tecnico tecnico) {
        return tecnicoService.guardarTecnico(tecnico);
    }

    @PutMapping("/{idTecnico}")
    public ResponseEntity<Tecnico> actualizarTecnico(
            @PathVariable Long idTecnico,
            @Valid @RequestBody Tecnico tecnico) {

        Tecnico actualizado = tecnicoService.actualizarTecnico(idTecnico, tecnico);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{idTecnico}")
    public ResponseEntity<Void> eliminarTecnico(@PathVariable Long idTecnico) {
        tecnicoService.eliminarTecnico(idTecnico);
        return ResponseEntity.noContent().build();
    }
}