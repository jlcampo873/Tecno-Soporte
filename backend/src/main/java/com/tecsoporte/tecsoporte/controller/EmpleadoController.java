package com.tecsoporte.tecsoporte.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tecsoporte.tecsoporte.model.Empleado;
import com.tecsoporte.tecsoporte.service.EmpleadoService;


@RestController

@RequestMapping("/api/empleados")
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @GetMapping
    public List<Empleado> listarEmpleados() {

        return empleadoService.listarEmpleados();
    }

    @GetMapping("/{idEmpleado}")
    public ResponseEntity<Empleado> buscarEmpleadoPorId(@PathVariable Long idEmpleado) {

        Optional<Empleado> empleado = empleadoService.buscarEmpleadoPorId(idEmpleado);

        if (empleado.isPresent()) {
            return ResponseEntity.ok(empleado.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Empleado guardarEmpleado(@RequestBody Empleado empleado) {

        return empleadoService.guardarEmpleado(empleado);
    }

    @PutMapping("/{idEmpleado}")
    public ResponseEntity<Empleado> actualizarEmpleado(
            @PathVariable Long idEmpleado,
            @RequestBody Empleado empleado) {

        Optional<Empleado> empleadoExistente = empleadoService.buscarEmpleadoPorId(idEmpleado);

        if (empleadoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        empleado.setIdEmpleado(idEmpleado);

        Empleado empleadoActualizado = empleadoService.guardarEmpleado(empleado);

        return ResponseEntity.ok(empleadoActualizado);
    }

    @DeleteMapping("/{idEmpleado}")
    public ResponseEntity<Void> eliminarEmpleado(@PathVariable Long idEmpleado) {

        boolean eliminado = empleadoService.eliminarEmpleado(idEmpleado);

        if (eliminado) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
