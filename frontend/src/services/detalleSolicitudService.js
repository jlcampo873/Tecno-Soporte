import api from "./api";
export const getDetalles = () => api.get("/detalles");
export const crearDetalle = (detalle) => api.post("/detalles", detalle);
export const actualizarDetalle = (idDetalle, detalle) => api.put(`/detalles/${idDetalle}`, detalle);
export const eliminarDetalle = (idDetalle) => api.delete(`/detalles/${idDetalle}`);
