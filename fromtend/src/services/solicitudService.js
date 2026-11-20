import api from "./api";
export const getSolicitudes = () => api.get("/solicitudes");
export const getSolicitudesPorEmpleado = (idEmpleado) => api.get(`/solicitudes/empleado/${idEmpleado}`);
export const crearSolicitud = (idEmpleado, solicitud) => api.post(`/solicitudes/empleado/${idEmpleado}`, solicitud);
export const actualizarSolicitud = (idSolicitud, idEmpleado, solicitud) => api.put(`/solicitudes/${idSolicitud}/empleado/${idEmpleado}`, solicitud);
export const eliminarSolicitud = (idSolicitud) => api.delete(`/solicitudes/${idSolicitud}`);
