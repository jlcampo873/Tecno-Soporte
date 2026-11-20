package com.tecsoporte.tecsoporte.service;

import com.tecsoporte.tecsoporte.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    List<Usuario> listarUsuarios();
    Optional<Usuario> buscarPorId(Long id);
    Usuario guardarUsuario(Usuario usuario);
    Usuario actualizarUsuario(Long id, Usuario usuario);

    void eliminarUsuario(Long id);

    Optional<Usuario> buscarPorCorreo(String correo);
}