package com.tecsoporte.tecsoporte.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tecsoporte.tecsoporte.dto.DashboardResumenDTO;
import com.tecsoporte.tecsoporte.repository.UsuarioRepository;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public DashboardResumenDTO obtenerResumen() {

        DashboardResumenDTO resumen = new DashboardResumenDTO();

        // Total de usuarios
        resumen.setUsuarios(usuarioRepository.count());

        resumen.setServiciosFinalizados(0);

        return resumen;
    }
}
