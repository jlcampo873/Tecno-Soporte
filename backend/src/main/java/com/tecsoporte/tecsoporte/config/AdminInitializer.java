package com.tecsoporte.tecsoporte.config;

import com.tecsoporte.tecsoporte.model.Usuario;
import com.tecsoporte.tecsoporte.repository.UsuarioRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Locale;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${BOOTSTRAP_ADMIN_NOMBRES:}")
    private String nombres;

    @Value("${BOOTSTRAP_ADMIN_APELLIDOS:}")
    private String apellidos;

    @Value("${BOOTSTRAP_ADMIN_EMAIL:}")
    private String correo;

    @Value("${BOOTSTRAP_ADMIN_PASSWORD:}")
    private String password;

    public AdminInitializer(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {

        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (nombres.isBlank()
                || apellidos.isBlank()
                || correo.isBlank()
                || password.isBlank()) {

            System.out.println("Administrador inicial no configurado.");
            return;
        }

        String correoNormalizado = correo.trim().toLowerCase(Locale.ROOT);

        if (usuarioRepository.existsByCorreo(correoNormalizado)) {
            System.out.println("El administrador inicial ya existe.");
            return;
        }

        Usuario administrador = new Usuario(
                null,
                nombres.trim(),
                apellidos.trim(),
                correoNormalizado,
                passwordEncoder.encode(password),
                "ADMIN",
                true
        );

        usuarioRepository.save(administrador);

        System.out.println(
                "Administrador inicial creado correctamente."
        );
    }
}

