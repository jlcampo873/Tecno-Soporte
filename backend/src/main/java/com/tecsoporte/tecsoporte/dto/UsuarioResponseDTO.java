package com.tecsoporte.tecsoporte.dto;

public class UsuarioResponseDTO {

    private Long id;
    private String nombres;
    private String apellidos;
    private String correo;
    private String rol;
    private Boolean activo;

    public UsuarioResponseDTO() {
    }

    public UsuarioResponseDTO(
            Long id,
            String nombres,
            String apellidos,
            String correo,
            String rol,
            Boolean activo) {

        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.correo = correo;
        this.rol = rol;
        this.activo = activo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }
}
