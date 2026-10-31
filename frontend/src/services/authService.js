import api from "./api";

export const login = async (correo, password) => {
  const response = await api.post("/auth/login", { correo, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
  localStorage.removeItem("rol");
};

export const getToken = () => localStorage.getItem("token");
export const getRol = () => localStorage.getItem("rol");
export const getUsuario = () => localStorage.getItem("usuario");
export const estaAutenticado = () => Boolean(getToken());
