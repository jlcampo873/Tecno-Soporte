import { createContext, useEffect, useMemo, useState } from "react";
import { login as loginService, logout as logoutService, getToken, getRol, getUsuario } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());
  const [usuario, setUsuario] = useState(getUsuario());
  const [rol, setRol] = useState(getRol());
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const autenticado = Boolean(token);

  useEffect(() => {
    const expired = () => {
      logoutService();
      setToken(null); setUsuario(null); setRol(null); setError("La sesión ha expirado. Inicia sesión nuevamente.");
    };
    window.addEventListener("auth:expired", expired);
    return () => window.removeEventListener("auth:expired", expired);
  }, []);

  const iniciarSesion = async (correo, password) => {
    setCargando(true); setError("");
    try {
      const respuesta = await loginService(correo, password);
      if (!respuesta?.token || !respuesta?.correo || !respuesta?.rol) throw new Error("La respuesta del servidor es inválida.");
      const rolNormalizado = respuesta.rol.replace("ROLE_", "").toUpperCase();
      localStorage.setItem("token", respuesta.token);
      localStorage.setItem("usuario", respuesta.correo);
      localStorage.setItem("rol", rolNormalizado);
      setToken(respuesta.token); setUsuario(respuesta.correo); setRol(rolNormalizado);
      return { exito: true, datos: respuesta };
    } catch (err) {
      logoutService(); setToken(null); setUsuario(null); setRol(null);
      const data = err.response?.data;
      const mensaje = data?.message || (err.response?.status === 403 ? "Acceso denegado." : err.code === "ERR_NETWORK" ? "No fue posible conectar con el servidor." : err.message || "No fue posible iniciar sesión.");
      setError(mensaje);
      return { exito: false, mensaje };
    } finally { setCargando(false); }
  };

  const cerrarSesion = () => { logoutService(); setToken(null); setUsuario(null); setRol(null); setError(""); };
  const tieneRol = (...rolesPermitidos) => rolesPermitidos.includes(rol);

  const value = useMemo(() => ({ token, usuario, rol, autenticado, cargando, error, iniciarSesion, cerrarSesion, tieneRol }), [token, usuario, rol, autenticado, cargando, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
