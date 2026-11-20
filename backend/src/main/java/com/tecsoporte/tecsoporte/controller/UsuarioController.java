package com.tecsoporte.tecsoporte.controller;

import com.tecsoporte.tecsoporte.model.Usuario;
import com.tecsoporte.tecsoporte.dto.UsuarioRequestDTO;
import com.tecsoporte.tecsoporte.dto.UsuarioResponseDTO;
import com.tecsoporte.tecsoporte.dto.UsuarioUpdateDTO;
import com.tecsoporte.tecsoporte.service.UsuarioService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/usuarios")

public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<UsuarioResponseDTO> listarUsuarios() {

        return usuarioService.listarUsuarios()
                .stream()
                .map(this::convertirAResponseDTO)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> buscarPorId(
            @PathVariable Long id) {

        return usuarioService.buscarPorId(id)
                .map(this::convertirAResponseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public UsuarioResponseDTO crearUsuario(
            @Valid @RequestBody UsuarioRequestDTO request) {

        Usuario usuario = new Usuario();

        usuario.setNombres(request.getNombres());
        usuario.setApellidos(request.getApellidos());
        usuario.setCorreo(request.getCorreo());
        usuario.setPassword(request.getPassword());
        usuario.setRol(request.getRol());
        usuario.setActivo(request.getActivo());

        Usuario guardado = usuarioService.guardarUsuario(usuario);
        return convertirAResponseDTO(guardado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> actualizarUsuario(
            @PathVariable Long id,
            @Valid @RequestBody UsuarioUpdateDTO request) {
        Usuario usuario = new Usuario();

        usuario.setNombres(request.getNombres());
        usuario.setApellidos(request.getApellidos());
        usuario.setCorreo(request.getCorreo());
        usuario.setPassword(request.getPassword());
        usuario.setRol(request.getRol());
        usuario.setActivo(request.getActivo());

        Usuario actualizado = usuarioService.actualizarUsuario(id, usuario);

        return ResponseEntity.ok(
                convertirAResponseDTO(actualizado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarUsuario(@PathVariable Long id) {

        usuarioService.eliminarUsuario(id);

        return ResponseEntity.noContent().build();
    }

    private UsuarioResponseDTO convertirAResponseDTO(Usuario usuario) {

        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getCorreo(),
                usuario.getRol(),
                usuario.getActivo());
    }
}