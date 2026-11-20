package com.tecsoporte.tecsoporte.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class OrdenServicioResponse {

    private Long idSolicitud;
    private LocalDate fechaSolicitud;
    private String estadoSolicitud;
    private Long idEmpleado;
    private String nombreEmpleado;
    private String correoEmpleado;
    private String descripcionSolicitud;
    private String tipoServicio;
    private List<DetalleOrdenResponse> detalles;
    private BigDecimal totalGeneral;

    public OrdenServicioResponse() {
    }

    public OrdenServicioResponse(
            Long idSolicitud,
            LocalDate fechaSolicitud,
            String estadoSolicitud,
            Long idEmpleado,
            String nombreEmpleado,
            String correoEmpleado,
            String descripcionSolicitud,
            String tipoServicio,
            List<DetalleOrdenResponse> detalles,
            BigDecimal totalGeneral
    ) {
        this.idSolicitud = idSolicitud;
        this.fechaSolicitud = fechaSolicitud;
        this.estadoSolicitud = estadoSolicitud;
        this.idEmpleado = idEmpleado;
        this.nombreEmpleado = nombreEmpleado;
        this.correoEmpleado = correoEmpleado;
        this.descripcionSolicitud = descripcionSolicitud;
        this.tipoServicio = tipoServicio;
        this.detalles = detalles;
        this.totalGeneral = totalGeneral;
    }

    public Long getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(Long idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public LocalDate getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(LocalDate fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public String getEstadoSolicitud() {
        return estadoSolicitud;
    }

    public void setEstadoSolicitud(String estadoSolicitud) {
        this.estadoSolicitud = estadoSolicitud;
    }

    public Long getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(Long idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getNombreEmpleado() {
        return nombreEmpleado;
    }

    public void setNombreEmpleado(String nombreEmpleado) {
        this.nombreEmpleado = nombreEmpleado;
    }

    public String getCorreoEmpleado() {
        return correoEmpleado;
    }

    public void setCorreoEmpleado(String correoEmpleado) {
        this.correoEmpleado = correoEmpleado;
    }

    public String getDescripcionSolicitud() {
        return descripcionSolicitud;
    }

    public void setDescripcionSolicitud(String descripcionSolicitud) {
        this.descripcionSolicitud = descripcionSolicitud;
    }

    public String getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(String tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public List<DetalleOrdenResponse> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleOrdenResponse> detalles) {
        this.detalles = detalles;
    }

    public BigDecimal getTotalGeneral() {
        return totalGeneral;
    }

    public void setTotalGeneral(BigDecimal totalGeneral) {
        this.totalGeneral = totalGeneral;
    }
}