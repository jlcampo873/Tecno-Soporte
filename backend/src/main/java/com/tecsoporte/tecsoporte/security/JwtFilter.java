package com.tecsoporte.tecsoporte.security;

import com.tecsoporte.tecsoporte.model.Usuario;
import com.tecsoporte.tecsoporte.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;

    public JwtFilter(JwtUtil jwtUtil, UsuarioRepository usuarioRepository) {
        this.jwtUtil = jwtUtil;
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        String token = null;

        if (StringUtils.hasText(header) && header.regionMatches(true, 0, "Bearer ", 0, 7)) {
            token = header.substring(7).trim();
        }

        if (StringUtils.hasText(token) && jwtUtil.validarToken(token)
                && SecurityContextHolder.getContext().getAuthentication() == null) {
            String correo = jwtUtil.obtenerCorreoDesdeToken(token);
            Usuario usuario = usuarioRepository.findByCorreo(correo).orElse(null);

            if (usuario != null && Boolean.TRUE.equals(usuario.getActivo()) && usuario.getRol() != null) {
                String rol = usuario.getRol().trim().toUpperCase();
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                usuario.getCorreo(),
                                null,
                                List.of(new SimpleGrantedAuthority("ROLE_" + rol)));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}
