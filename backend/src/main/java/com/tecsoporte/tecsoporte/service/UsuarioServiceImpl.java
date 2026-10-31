package com.tecsoporte.tecsoporte.service;

import com.tecsoporte.tecsoporte.exception.RecursoNoEncontradoException;
import com.tecsoporte.tecsoporte.model.Usuario;
import com.tecsoporte.tecsoporte.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private static final List<String> ROLES_VALIDOS = List.of("ADMIN", "TECNICO", "EMPLEADO");
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override public List<Usuario> listarUsuarios() { return usuarioRepository.findAll(); }
    @Override public Optional<Usuario> buscarPorId(Long id) { return usuarioRepository.findById(id); }

    @Override
    public Usuario guardarUsuario(Usuario usuario) {
        validarRol(usuario.getRol());
        usuario.setCorreo(normalizarCorreo(usuario.getCorreo()));
        usuario.setRol(usuario.getRol().trim().toUpperCase());
        usuario.setActivo(usuario.getActivo() == null || usuario.getActivo());
        if (usuario.getPassword() == null || usuario.getPassword().isBlank()) {
            throw new IllegalArgumentException("La contraseña es obligatoria al crear un usuario.");
        }
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario actualizarUsuario(Long id, Usuario usuario) {
        Usuario existente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado"));

        validarRol(usuario.getRol());
        String correo = normalizarCorreo(usuario.getCorreo());

        usuarioRepository.findByCorreo(correo).ifPresent(otro -> {
            if (!otro.getId().equals(id)) {
                throw new IllegalArgumentException("El correo electrónico ya está registrado.");
            }
        });

        existente.setNombres(usuario.getNombres().trim());
        existente.setApellidos(usuario.getApellidos().trim());
        existente.setCorreo(correo);
        existente.setRol(usuario.getRol().trim().toUpperCase());
        existente.setActivo(usuario.getActivo() == null || usuario.getActivo());

        if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
            existente.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        return usuarioRepository.save(existente);
    }

    @Override
    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RecursoNoEncontradoException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    @Override public Optional<Usuario> buscarPorCorreo(String correo) { return usuarioRepository.findByCorreo(correo); }

    private String normalizarCorreo(String correo) {
        return correo == null ? null : correo.trim().toLowerCase();
    }

    private void validarRol(String rol) {
        if (rol == null || !ROLES_VALIDOS.contains(rol.trim().toUpperCase())) {
            throw new IllegalArgumentException("El rol debe ser ADMIN, TECNICO o EMPLEADO.");
        }
    }
}
