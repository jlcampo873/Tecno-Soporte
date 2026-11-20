package com.tecsoporte.tecsoporte.controller;

import com.tecsoporte.tecsoporte.dto.LoginRequest;
import com.tecsoporte.tecsoporte.dto.LoginResponse;
import com.tecsoporte.tecsoporte.model.Usuario;
import com.tecsoporte.tecsoporte.repository.UsuarioRepository;
import com.tecsoporte.tecsoporte.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioRepository usuarioRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        Usuario usuario = usuarioRepository.findByCorreo(request.getCorreo().trim().toLowerCase()).orElse(null);

        if (usuario == null || !Boolean.TRUE.equals(usuario.getActivo())
                || !passwordEncoder.matches(request.getPassword(), usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Correo o contraseña incorrectos."));
        }

        String rol = usuario.getRol().trim().toUpperCase();
        String token = jwtUtil.generarToken(usuario.getCorreo());

        return ResponseEntity.ok(new LoginResponse(
                "Autenticación satisfactoria",
                usuario.getCorreo(),
                rol,
                token,
                "Bearer"
        ));
    }
}
