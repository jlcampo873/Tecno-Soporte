/*import { useContext } from "react";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({
  moduloActivo,
  setModuloActivo
}) => {

  const { rol } = useContext(AuthContext);

  const anchoSidebar = 260;

  const opcionesMenu = [
    {
      nombre: "Dashboard",
      modulo: "dashboard",
      icono: <DashboardIcon />,
      roles: [
        "ADMIN",
        "TECNICO",
        "EMPLEADO"
      ]
    },
    {
      nombre: "Empleados",
      modulo: "empleados",
      icono: <PeopleIcon />,
      roles: [
        "ADMIN",
        "TECNICO"
      ]
    },
    {
      nombre: "Usuarios",
      modulo: "usuarios",
      icono: <ManageAccountsIcon />,
      roles: [
        "ADMIN"
      ]
    },
    {
      nombre: "Técnicos",
      modulo: "tecnicos",
      icono: <EngineeringIcon />,
      roles: [
        "ADMIN"
      ]
    },
    {
      nombre: "Servicios",
      modulo: "servicios",
      icono: <BuildIcon />,
      roles: [
        "ADMIN",
        "TECNICO"
      ]
    },
    {
      nombre: "Solicitudes",
      modulo: "solicitudes",
      icono: <AssignmentIcon />,
      roles: [
        "ADMIN",
        "TECNICO",
        "EMPLEADO"
      ]
    },
    {
      nombre: "Detalles de solicitud",
      modulo: "detalles",
      icono: <FormatListBulletedIcon />,
      roles: [
        "ADMIN",
        "TECNICO"
      ]
    },
    {
      nombre: "Órdenes de servicio",
      modulo: "ordenes",
      icono: <ReceiptLongIcon />,
      roles: [
        "ADMIN",
        "TECNICO"
      ]
    }
  ];

  const opcionesPermitidas =
    opcionesMenu.filter((opcion) =>
      opcion.roles.includes(rol)
    );

  const seleccionarModulo = (modulo) => {
    setModuloActivo(modulo);
  };

  return (
    <Box
      component="aside"
      sx={{
        width: anchoSidebar,
        minWidth: anchoSidebar,
        minHeight: "calc(100vh - 64px)",
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e0e0e0",
        boxShadow: 1
      }}
    >
      {}

      <Box
        sx={{
          px: 3,
          py: 2
        }}
      >
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{
            fontWeight: 700,
            letterSpacing: 1.2
          }}
        >
          Menú principal
        </Typography>
      </Box>

      <Divider />

      {}

      <List
        sx={{
          px: 1.5,
          py: 2
        }}
      >
        {opcionesPermitidas.map(
          (opcion) => (
            <ListItemButton
              key={opcion.modulo}
              selected={
                moduloActivo ===
                opcion.modulo
              }
              onClick={() =>
                seleccionarModulo(
                  opcion.modulo
                )
              }
              sx={{
                mb: 0.7,
                borderRadius: 2,
                minHeight: 48,

                "&.Mui-selected": {
                  backgroundColor:
                    "primary.main",
                  color: "primary.contrastText"
                },

                "&.Mui-selected:hover": {
                  backgroundColor:
                    "primary.dark"
                },

                "&.Mui-selected .MuiListItemIcon-root":
                  {
                    color:
                      "primary.contrastText"
                  },

                "&:hover": {
                  backgroundColor:
                    "action.hover"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 42,
                  color:
                    moduloActivo ===
                    opcion.modulo
                      ? "inherit"
                      : "text.secondary"
                }}
              >
                {opcion.icono}
              </ListItemIcon>

              <ListItemText
                primary={opcion.nombre}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight:
                    moduloActivo ===
                    opcion.modulo
                      ? 700
                      : 500
                }}
              />
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
*/

import { useContext } from "react";

import {
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { AuthContext } from "../../context/AuthContext";

const Sidebar = ({
    moduloActivo,
    setModuloActivo
}) => {

    const { rol } = useContext(AuthContext);

    const anchoSidebar = 260;

    const opcionesMenu = [
        {
            nombre: "Dashboard",
            modulo: "dashboard",
            icono: <DashboardIcon />,
            roles: [
                "ADMIN",
                "TECNICO",
                "EMPLEADO"
            ]
        },
        {
            nombre: "Empleados",
            modulo: "empleados",
            icono: <PeopleIcon />,
            roles: [
                "ADMIN",
                "TECNICO"
            ]
        },
        {
            nombre: "Usuarios",
            modulo: "usuarios",
            icono: <ManageAccountsIcon />,
            roles: [
                "ADMIN"
            ]
        },
        {
            nombre: "Técnicos",
            modulo: "tecnicos",
            icono: <EngineeringIcon />,
            roles: [
                "ADMIN"
            ]
        },
        {
            nombre: "Servicios",
            modulo: "servicios",
            icono: <BuildIcon />,
            roles: [
                "ADMIN",
                "TECNICO"
            ]
        },
        {
            nombre: "Solicitudes",
            modulo: "solicitudes",
            icono: <AssignmentIcon />,
            roles: [
                "ADMIN",
                "TECNICO",
                "EMPLEADO"
            ]
        },
        {
            nombre: "Detalles de solicitud",
            modulo: "detalles",
            icono: <FormatListBulletedIcon />,
            roles: [
                "ADMIN",
                "TECNICO"
            ]
        },
        {
            nombre: "Órdenes de servicio",
            modulo: "ordenes",
            icono: <ReceiptLongIcon />,
            roles: [
                "ADMIN",
                "TECNICO"
            ]
        }
    ];

    const opcionesPermitidas =
        opcionesMenu.filter((opcion) =>
            opcion.roles.includes(rol)
        );

    const seleccionarModulo = (modulo) => {
        setModuloActivo(modulo);
    };

    return (
        <Box
            component="aside"
            sx={{
                width: anchoSidebar,
                minWidth: anchoSidebar,
                minHeight: "calc(100vh - 64px)",

                backgroundColor: "#ffffff",

                borderRight:
                    "1px solid #e0e0e0",

                boxShadow:
                    "2px 0 8px rgba(0, 0, 0, 0.04)"
            }}
        >

            {/* ENCABEZADO */}

            <Box
                sx={{
                    px: 3,
                    py: 2.5
                }}
            >

                <Typography
                    variant="overline"
                    sx={{
                        fontWeight: 800,
                        letterSpacing: 1.2,
                        color: "#78909c"
                    }}
                >
                    Menú principal
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        mt: 0.5,
                        color: "#90a4ae"
                    }}
                >
                    Administración del sistema
                </Typography>

            </Box>

            <Divider />

            {/* OPCIONES */}

            <List
                sx={{
                    px: 1.5,
                    py: 2
                }}
            >

                {opcionesPermitidas.map(
                    (opcion) => {

                        const activo =
                            moduloActivo ===
                            opcion.modulo;

                        return (
                            <ListItemButton
                                key={opcion.modulo}
                                selected={activo}
                                onClick={() =>
                                    seleccionarModulo(
                                        opcion.modulo
                                    )
                                }
                                sx={{
                                    mb: 0.7,
                                    borderRadius: 2,
                                    minHeight: 48,

                                    position:
                                        "relative",

                                    color: activo
                                        ? "#ffffff"
                                        : "#455a64",

                                    backgroundColor:
                                        activo
                                            ? "#1565c0"
                                            : "transparent",

                                    transition:
                                        "all 0.2s ease",

                                    "&:hover": {
                                        backgroundColor:
                                            activo
                                                ? "#0d47a1"
                                                : "#f5f9ff",

                                        transform:
                                            "translateX(2px)"
                                    },

                                    "&.Mui-selected": {
                                        backgroundColor:
                                            "#1565c0",

                                        color:
                                            "#ffffff"
                                    },

                                    "&.Mui-selected:hover": {
                                        backgroundColor:
                                            "#0d47a1"
                                    }
                                }}
                            >

                                <ListItemIcon
                                    sx={{
                                        minWidth: 42,

                                        color: activo
                                            ? "#ffffff"
                                            : "#78909c",

                                        transition:
                                            "color 0.2s ease"
                                    }}
                                >
                                    {opcion.icono}
                                </ListItemIcon>

                                <ListItemText
                                    primary={
                                        opcion.nombre
                                    }
                                    primaryTypographyProps={{
                                        fontSize: 14,

                                        fontWeight:
                                            activo
                                                ? 700
                                                : 500
                                    }}
                                />

                            </ListItemButton>
                        );
                    }
                )}

            </List>

            {/* INFORMACIÓN DEL ROL */}

            <Box
                sx={{
                    mx: 2,
                    mt: 1,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "#f5f9ff",
                    border:
                        "1px solid #e3f2fd"
                }}
            >

                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        color: "#78909c",
                        mb: 0.5
                    }}
                >
                    Rol actual
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        fontWeight: 700,
                        color: "#1565c0"
                    }}
                >
                    {rol}
                </Typography>

            </Box>

        </Box>
    );
};

export default Sidebar;
