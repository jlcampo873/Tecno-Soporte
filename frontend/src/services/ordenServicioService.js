import api from "./api";
export const obtenerOrdenServicio = (idSolicitud) => api.get(`/ordenes/${idSolicitud}`);
