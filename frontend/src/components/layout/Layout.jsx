import { Box } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({
  moduloActivo,
  setModuloActivo,
  children
}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f6f8"
      }}
    >
      {/*
       * Barra superior de la aplicación.
       */}

      <Navbar />

      {/*
       * Contenedor inferior.
       *
       * Organiza horizontalmente:
       *
       * Sidebar | Contenido principal
       */}

      <Box
        sx={{
          display: "flex",
          minHeight: "calc(100vh - 64px)"
        }}
      >
        {/*
         * Menú lateral.
         */}

        <Sidebar
          moduloActivo={moduloActivo}
          setModuloActivo={setModuloActivo}
        />

        {/*
         * Área principal de trabajo.
         *
         * Aquí se mostrarán:
         *
         * Dashboard
         * Empleados
         * Usuarios
         * Técnicos
         * Servicios
         * Solicitudes
         * Detalles
         * Órdenes
         */}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: 0,
            minWidth: 0,
            p: {
              xs: 2,
              sm: 3,
              md: 4
            },
            overflow: "auto"
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;