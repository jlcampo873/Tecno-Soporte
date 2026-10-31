import api from "./api";
export const listarUsuarios = () => api.get("/usuarios");
export const crearUsuario = (usuario) => api.post("/usuarios", usuario);
export const actualizarUsuario = (id, usuario) => api.put(`/usuarios/${id}`, usuario);
export const eliminarUsuario = (id) => api.delete(`/usuarios/${id}`);
