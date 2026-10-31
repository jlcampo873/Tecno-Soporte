import { useContext, useEffect, useState } from "react";

import {
    Avatar,
    Box,
    Button,
    Chip,
    Paper,
    Typography
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BuildIcon from "@mui/icons-material/Build";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { AuthContext } from "../context/AuthContext";
import dashboardService from "../services/dashboardService";

const Dashboard = ({ setModuloActivo }) => {

    const {
        usuario,
        rol
    } = useContext(AuthContext);

    const [resumen, setResumen] = useState({
        empleados: 0,
        usuarios: 0,
        tecnicos: 0,
        servicios: 0,
        solicitudesPendientes: 0,
        ordenesActivas: 0,
        serviciosFinalizados: 0
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const nombreUsuario =
        usuario?.split("@")[0] || "Usuario";

    const inicial =
        nombreUsuario.charAt(0).toUpperCase();

    useEffect(() => {

        const cargarDashboard = async () => {

            try {

                setLoading(true);
                setError(false);

                const datos =
                    await dashboardService.obtenerResumen();

                console.log(
                    "Respuesta Dashboard:",
                    datos
                );

                setResumen(datos);

            } catch (error) {

                console.error(
                    "Error al cargar Dashboard:",
                    error
                );

                setError(true);

            } finally {

                setLoading(false);

            }
        };

        cargarDashboard();

    }, []);

    const indicadores = [
        {
            titulo: "Empleados registrados",
            valor: resumen.empleados,
            descripcion:
                "Total de empleados registrados",
            icono: <PeopleIcon />,
            fondo: "#e3f2fd",
            iconoColor: "#1565c0"
        },
        {
            titulo: "Solicitudes pendientes",
            valor:
                resumen.solicitudesPendientes,
            descripcion:
                "Solicitudes que requieren atención",
            icono: <PendingActionsIcon />,
            fondo: "#fff3e0",
            iconoColor: "#ef6c00"
        },
        {
            titulo: "Órdenes activas",
            valor:
                resumen.ordenesActivas,
            descripcion:
                "Órdenes actualmente en proceso",
            icono: <AccessTimeIcon />,
            fondo: "#f3e5f5",
            iconoColor: "#7b1fa2"
        },
        {
            titulo: "Servicios finalizados",
            valor:
                resumen.serviciosFinalizados,
            descripcion:
                "Servicios completados",
            icono: <CheckCircleIcon />,
            fondo: "#e8f5e9",
            iconoColor: "#2e7d32"
        }
    ];

    const accesosRapidos = [
        {
            titulo: "Empleados",
            descripcion:
                "Consultar y administrar los empleados registrados.",
            modulo: "empleados",
            icono: <PeopleIcon />,
            roles: [
                "ADMIN",
                "TECNICO"
            ]
        },
        {
            titulo: "Usuarios",
            descripcion:
                "Gestionar las cuentas de acceso al sistema.",
            modulo: "usuarios",
            icono: <ManageAccountsIcon />,
            roles: [
                "ADMIN"
            ]
        },
        {
            titulo: "Técnicos",
            descripcion:
                "Administrar el personal técnico disponible.",
            modulo: "tecnicos",
            icono: <EngineeringIcon />,
            roles: [
                "ADMIN"
            ]
        },
        {
            titulo: "Servicios",
            descripcion:
                "Consultar y administrar el catálogo de servicios.",
            modulo: "servicios",
            icono: <BuildIcon />,
            roles: [
                "ADMIN",
                "TECNICO"
            ]
        },
        {
            titulo: "Solicitudes",
            descripcion:
                "Revisar las solicitudes de servicio registradas.",
            modulo: "solicitudes",
            icono: <AssignmentIcon />,
            roles: [
                "ADMIN",
                "TECNICO",
                "EMPLEADO"
            ]
        },
        {
            titulo: "Órdenes de servicio",
            descripcion:
                "Consultar el estado de las órdenes generadas.",
            modulo: "ordenes",
            icono: <ReceiptLongIcon />,
            roles: [
                "ADMIN",
                "TECNICO"
            ]
        }
    ];

    const accesosPermitidos =
        accesosRapidos.filter((acceso) =>
            acceso.roles.includes(rol)
        );

    const abrirModulo = (modulo) => {

        if (
            typeof setModuloActivo ===
            "function"
        ) {
            setModuloActivo(modulo);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 1600,
                margin: "0 auto"
            }}
        >

            {/* ==================================================
                ENCABEZADO
            ================================================== */}

            <Paper
                elevation={0}
                sx={{
                    mb: 4,
                    p: {
                        xs: 3,
                        md: 4
                    },

                    borderRadius: 4,

                    background:
                        "linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)",

                    color: "#ffffff",

                    overflow: "hidden",

                    position: "relative"
                }}
            >

                {/* Elemento decorativo */}

                <Box
                    sx={{
                        position: "absolute",
                        width: 220,
                        height: 220,
                        borderRadius: "50%",
                        backgroundColor:
                            "rgba(255,255,255,0.08)",
                        right: -80,
                        top: -80
                    }}
                />

                <Box
                    sx={{
                        position: "relative",
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                        alignItems: {
                            xs: "flex-start",
                            md: "center"
                        },
                        justifyContent:
                            "space-between",
                        gap: 3
                    }}
                >

                    <Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 1
                            }}
                        >

                            <DashboardIcon />

                            <Typography
                                variant="overline"
                                sx={{
                                    fontWeight: 800,
                                    letterSpacing: 1.3
                                }}
                            >
                                Centro de control
                            </Typography>

                        </Box>

                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                mb: 1
                            }}
                        >
                            Bienvenido,{" "}
                            {nombreUsuario}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                maxWidth: 650,
                                opacity: 0.92,
                                lineHeight: 1.7
                            }}
                        >
                            Consulta el estado general
                            del sistema y accede
                            rápidamente a las funciones
                            disponibles para tu rol.
                        </Typography>

                    </Box>

                    {/* USUARIO */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,

                            backgroundColor:
                                "rgba(255,255,255,0.14)",

                            border:
                                "1px solid rgba(255,255,255,0.18)",

                            borderRadius: 3,

                            px: 2,
                            py: 1.5,

                            minWidth: {
                                xs: "100%",
                                md: 270
                            }
                        }}
                    >

                        <Avatar
                            sx={{
                                width: 50,
                                height: 50,
                                backgroundColor:
                                    "#ffffff",
                                color:
                                    "#1565c0",
                                fontWeight: 800
                            }}
                        >
                            {inicial}
                        </Avatar>

                        <Box>

                            <Typography
                                variant="caption"
                                sx={{
                                    opacity: 0.85
                                }}
                            >
                                Sesión activa
                            </Typography>

                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 700,
                                    wordBreak:
                                        "break-word"
                                }}
                            >
                                {usuario}
                            </Typography>

                            <Chip
                                label={rol}
                                size="small"
                                sx={{
                                    mt: 0.7,
                                    backgroundColor:
                                        "#ffffff",
                                    color:
                                        "#1565c0",
                                    fontWeight: 800
                                }}
                            />

                        </Box>

                    </Box>

                </Box>

            </Paper>

            {/* ==================================================
                RESUMEN
            ================================================== */}

            <Box sx={{ mb: 4 }}>

                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 800,
                        mb: 0.5
                    }}
                >
                    Resumen general
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2.5
                    }}
                >
                    Indicadores principales de la
                    operación del sistema.
                </Typography>

                {error && (
                    <Paper
                        elevation={0}
                        sx={{
                            mb: 2,
                            p: 2,
                            borderRadius: 2,
                            backgroundColor:
                                "#fff3e0",
                            border:
                                "1px solid #ffe0b2"
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#e65100",
                                fontWeight: 600
                            }}
                        >
                            No fue posible cargar
                            los indicadores del
                            dashboard.
                        </Typography>
                    </Paper>
                )}

                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            xl: "repeat(4, 1fr)"
                        },

                        gap: 2.5
                    }}
                >

                    {indicadores.map(
                        (indicador) => (

                            <Paper
                                key={
                                    indicador.titulo
                                }
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    borderRadius: 3,

                                    border:
                                        "1px solid #e0e0e0",

                                    transition:
                                        "all 0.2s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-4px)",

                                        boxShadow:
                                            "0 8px 24px rgba(0,0,0,0.08)"
                                    }
                                }}
                            >

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems:
                                            "flex-start",
                                        justifyContent:
                                            "space-between",
                                        gap: 2
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mb: 1,
                                                fontWeight: 500
                                            }}
                                        >
                                            {
                                                indicador.titulo
                                            }
                                        </Typography>

                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontWeight: 800,
                                                lineHeight: 1
                                            }}
                                        >
                                            {loading
                                                ? "..."
                                                : indicador.valor}
                                        </Typography>

                                    </Box>

                                    <Avatar
                                        sx={{
                                            backgroundColor:
                                                indicador.fondo,

                                            color:
                                                indicador.iconoColor,

                                            width: 48,
                                            height: 48
                                        }}
                                    >
                                        {
                                            indicador.icono
                                        }
                                    </Avatar>

                                </Box>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{
                                        display:
                                            "block",
                                        mt: 2
                                    }}
                                >
                                    {
                                        indicador.descripcion
                                    }
                                </Typography>

                            </Paper>

                        )
                    )}

                </Box>

            </Box>

            {/* ==================================================
                ACCESOS RÁPIDOS
            ================================================== */}

            <Box>

                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 800,
                        mb: 0.5
                    }}
                >
                    Accesos rápidos
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2.5
                    }}
                >
                    Accede directamente a los módulos
                    disponibles para tu rol.
                </Typography>

                <Box
                    sx={{
                        display: "grid",

                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, 1fr)",
                            xl: "repeat(3, 1fr)"
                        },

                        gap: 2.5
                    }}
                >

                    {accesosPermitidos.map(
                        (acceso) => (

                            <Paper
                                key={
                                    acceso.modulo
                                }
                                elevation={0}
                                sx={{
                                    p: 3,
                                    borderRadius: 3,

                                    border:
                                        "1px solid #e0e0e0",

                                    display: "flex",
                                    flexDirection:
                                        "column",

                                    minHeight: 210,

                                    transition:
                                        "all 0.2s ease",

                                    "&:hover": {
                                        transform:
                                            "translateY(-4px)",

                                        boxShadow:
                                            "0 8px 24px rgba(0,0,0,0.08)",

                                        borderColor:
                                            "#90caf9"
                                    }
                                }}
                            >

                                <Avatar
                                    sx={{
                                        mb: 2,
                                        backgroundColor:
                                            "#e3f2fd",
                                        color:
                                            "#1565c0"
                                    }}
                                >
                                    {
                                        acceso.icono
                                    }
                                </Avatar>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 800,
                                        mb: 1
                                    }}
                                >
                                    {
                                        acceso.titulo
                                    }
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        flexGrow: 1,
                                        mb: 2,
                                        lineHeight: 1.6
                                    }}
                                >
                                    {
                                        acceso.descripcion
                                    }
                                </Typography>

                                <Button
                                    variant="text"
                                    endIcon={
                                        <ArrowForwardIcon />
                                    }
                                    onClick={() =>
                                        abrirModulo(
                                            acceso.modulo
                                        )
                                    }
                                    sx={{
                                        alignSelf:
                                            "flex-start",

                                        px: 0,

                                        fontWeight: 800,

                                        textTransform:
                                            "none"
                                    }}
                                >
                                    Abrir módulo
                                </Button>

                            </Paper>

                        )
                    )}

                </Box>

            </Box>

        </Box>
    );
};

export default Dashboard;