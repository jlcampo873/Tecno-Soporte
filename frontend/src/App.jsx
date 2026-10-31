import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";

import "./App.css";

// Importación de las páginas / módulos
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Usuario from "./pages/Usuario";
import Empleado from "./pages/Empleado";
import Tecnico from "./pages/Tecnico";
import Servicio from "./pages/Servicio";
import SolicitudServicio from "./pages/SolicitudServicio";
import DetalleSolicitud from "./pages/DetalleSolicitud";
import OrdenServicio from "./pages/OrdenServicio";

import Layout from "./components/layout/Layout";
import { AuthContext } from "./context/AuthContext";

// Configuración de permisos por rol para cada módulo
const MODULOS = {
  dashboard: ["ADMIN", "TECNICO", "EMPLEADO"],
  empleados: ["ADMIN", "TECNICO"],
  usuarios: ["ADMIN"],
  tecnicos: ["ADMIN"],
  servicios: ["ADMIN", "TECNICO"],
  solicitudes: ["ADMIN", "TECNICO", "EMPLEADO"],
  detalles: ["ADMIN", "TECNICO"],
  ordenes: ["ADMIN", "TECNICO"]
};

function App() {
  const { autenticado, rol } = useContext(AuthContext);
  const [moduloActivo, setModuloActivo] = useState("dashboard");

  // Redirige al dashboard si el usuario intenta acceder a un módulo para el cual no tiene permisos
  useEffect(() => {
    if (
      autenticado &&
      !MODULOS[moduloActivo]?.includes(rol)
    ) {
      setModuloActivo("dashboard");
    }
  }, [autenticado, rol, moduloActivo]);

  // Si no está autenticado, muestra la pantalla de Login
  if (!autenticado) {
    return <Login />;
  }

  // Función encargada de renderizar el módulo según el estado moduloActivo
  const renderizarModulo = () => {
    // Validación de seguridad adicional por rol
    if (!MODULOS[moduloActivo]?.includes(rol)) {
      return (
        <Typography>
          No tienes permisos para este módulo.
        </Typography>
      );
    }

    switch (moduloActivo) {
      case "dashboard":
        return <Dashboard setModuloActivo={setModuloActivo} />;

      case "usuarios":
        return <Usuario />;

      case "empleados":
        return <Empleado />;

      case "tecnicos":
        return <Tecnico />;

      case "servicios":
        return <Servicio />;

      case "solicitudes":
        return <SolicitudServicio />;

      case "detalles":
        return <DetalleSolicitud />;

      case "ordenes":
        return <OrdenServicio />;

      default:
        return (
          <Typography>
            Módulo no disponible.
          </Typography>
        );
    }
  };

  return (
    <Layout
      moduloActivo={moduloActivo}
      setModuloActivo={setModuloActivo}
    >
      {renderizarModulo()}
    </Layout>
  );
}

export default App;
