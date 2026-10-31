package com.tecsoporte.tecsoporte.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity

@Table(name = "solicitud")
public class SolicitudServicio {

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSolicitud;

    @NotBlank(message = "La descripción es obligatoria")
    @Size(max = 255, message = "La descripción no puede superar los 255 caracteres")
    @Column(name = "descripcion", nullable = false, length = 255)
    private String descripcion;

    @NotBlank(message = "El tipo de servicio es obligatorio")
    @Size(max = 100, message = "El tipo de servicio no puede superar los 100 caracteres")
    @Column(name = "tipo_servicio", nullable = false, length = 100)
    private String tipoServicio;

    @NotNull(message = "El estado de la solicitud es obligatorio")
    @Enumerated(EnumType.STRING)
    @Column(name = "estado", nullable = false, length = 30)
    private EstadoSolicitud estado;

    @NotNull(message = "La fecha de solicitud es obligatoria")
    @FutureOrPresent(message = "La fecha de solicitud no puede estar en el pasado")
    @Column(name = "fecha_solicitud", nullable = false)
    private LocalDate fechaSolicitud;

    @NotBlank(message = "La dirección del servicio es obligatoria")
    @Size(max = 255, message = "La dirección no puede superar los 255 caracteres")
    @Column(name = "direccion_servicio", nullable = false, length = 255)
    private String direccionServicio;

    @ManyToOne(fetch = FetchType.LAZY)

    /*@JsonIgnore*/
    @JoinColumn(name = "id_empleado", nullable = false)
    private Empleado empleado;

    public SolicitudServicio() {
    }

    public Long getIdSolicitud() {
        return idSolicitud;
    }

    public void setIdSolicitud(Long idSolicitud) {
        this.idSolicitud = idSolicitud;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(String tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public EstadoSolicitud getEstado() {
        return estado;
    }

    public void setEstado(EstadoSolicitud estado) {
        this.estado = estado;
    }

    public LocalDate getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(LocalDate fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public String getDireccionServicio() {
        return direccionServicio;
    }

    public void setDireccionServicio(String direccionServicio) {
        this.direccionServicio = direccionServicio;
    }

    public Empleado getEmpleado() {
        return empleado;
    }

    public void setEmpleado(Empleado empleado) {
        this.empleado = empleado;
    }
}
