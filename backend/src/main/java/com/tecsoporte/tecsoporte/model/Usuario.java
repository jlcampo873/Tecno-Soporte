package com.tecsoporte.tecsoporte.model;

import jakarta.persistence.*;

import jakarta.validation.constraints.Email;

import jakarta.validation.constraints.NotBlank;

@Entity 

@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String nombres;

    @NotBlank
    private String apellidos;

    @Email
    @NotBlank
    @Column(unique = true)
    private String correo;

    @NotBlank
    private String password;

    @NotBlank
    private String rol;

    private Boolean activo = true;

    public Usuario() {
    }

    public Usuario(Long id,
                   String nombres,
                   String apellidos,
                   String correo,
                   String password,
                   String rol,
                   Boolean activo) {

        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;
        this.password = password;
        this.rol = rol;
        this.activo = activo;
    }

    public Long getId() {
        return id;
    }

    public String getNombres() {
        return nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public String getPassword() {
        return password;
    }

    public String getRol() {
        return rol;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}