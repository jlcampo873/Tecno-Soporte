import api from "./api";

export const getDepartamentos = () => api.get("/publica/colombia/departamentos");
export const getRegiones = () => api.get("/publica/colombia/regiones");
export const getMunicipiosPorDepartamento = (idDepartamento) =>
  api.get(`/publica/colombia/departamentos/${idDepartamento}/municipios`);
