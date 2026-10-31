import api from "./api";
export const getTecnicos = () => api.get("/tecnicos");
export const crearTecnico = (tecnico) => api.post("/tecnicos", tecnico);
export const actualizarTecnico = (idTecnico, tecnico) => api.put(`/tecnicos/${idTecnico}`, tecnico);
export const eliminarTecnico = (idTecnico) => api.delete(`/tecnicos/${idTecnico}`);
