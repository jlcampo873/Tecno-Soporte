import api from "./api";
export const getServicios = () => api.get("/servicios");
export const crearServicio = (servicio) => api.post("/servicios", servicio);
export const actualizarServicio = (idServicio, servicio) => api.put(`/servicios/${idServicio}`, servicio);
export const eliminarServicio = (idServicio) => api.delete(`/servicios/${idServicio}`);
