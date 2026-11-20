import api from "./api";
export const getEmpleados = () => api.get("/empleados");
export const crearEmpleado = (empleado) => api.post("/empleados", empleado);
export const actualizarEmpleado = (idEmpleado, empleado) => api.put(`/empleados/${idEmpleado}`, empleado);
export const eliminarEmpleado = (idEmpleado) => api.delete(`/empleados/${idEmpleado}`);
