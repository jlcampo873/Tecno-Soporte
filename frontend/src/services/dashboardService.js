import api from "./api";
export const obtenerResumen = async () => (await api.get("/dashboard/resumen")).data;
export default { obtenerResumen };
