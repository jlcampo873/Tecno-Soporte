package com.tecsoporte.tecsoporte.dto;

public class DashboardResumenDTO {

    private long empleados;
    private long usuarios;
    private long tecnicos;
    private long servicios;
    private long solicitudesPendientes;
    private long ordenesActivas;
    private long serviciosFinalizados;

    public DashboardResumenDTO() {
    }

    public DashboardResumenDTO(
            long empleados,
            long usuarios,
            long tecnicos,
            long servicios,
            long solicitudesPendientes,
            long ordenesActivas,
            long serviciosFinalizados
    ) {
        this.empleados = empleados;
        this.usuarios = usuarios;
        this.tecnicos = tecnicos;
        this.servicios = servicios;
        this.solicitudesPendientes = solicitudesPendientes;
        this.ordenesActivas = ordenesActivas;
        this.serviciosFinalizados = serviciosFinalizados;
    }

    public long getEmpleados() {
        return empleados;
    }

    public long getUsuarios() {
        return usuarios;
    }

    public long getTecnicos() {
        return tecnicos;
    }

    public long getServicios() {
        return servicios;
    }

    public long getSolicitudesPendientes() {
        return solicitudesPendientes;
    }

    public long getOrdenesActivas() {
        return ordenesActivas;
    }

    public long getServiciosFinalizados() {
        return serviciosFinalizados;
    }

    public void setEmpleados(long empleados) {
        this.empleados = empleados;
    }

    public void setUsuarios(long usuarios) {
        this.usuarios = usuarios;
    }

    public void setTecnicos(long tecnicos) {
        this.tecnicos = tecnicos;
    }

    public void setServicios(long servicios) {
        this.servicios = servicios;
    }

    public void setSolicitudesPendientes(long solicitudesPendientes) {
        this.solicitudesPendientes = solicitudesPendientes;
    }

    public void setOrdenesActivas(long ordenesActivas) {
        this.ordenesActivas = ordenesActivas;
    }

    public void setServiciosFinalizados(long serviciosFinalizados) {
        this.serviciosFinalizados = serviciosFinalizados;
    }
}
