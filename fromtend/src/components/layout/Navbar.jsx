import { useContext } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    Avatar,
    Chip
} from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {

    const {
        usuario,
        rol,
        cerrarSesion
    } = useContext(AuthContext);

    const nombreUsuario =
        usuario?.split("@")[0] || "Usuario";

    const inicial =
        nombreUsuario.charAt(0).toUpperCase();

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: "#ffffff",
                color: "#263238",
                borderBottom: "1px solid #e0e0e0",
                zIndex: 1200
            }}
        >

            <Toolbar
                sx={{
                    minHeight: "64px !important",
                    px: {
                        xs: 2,
                        sm: 3
                    }
                }}
            >

                {/* LOGO / NOMBRE DEL SISTEMA */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5
                    }}
                >

                    <Avatar
                        sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: "primary.main"
                        }}
                    >
                        <SupportAgentIcon />
                    </Avatar>

                    <Box>

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 800,
                                lineHeight: 1.1,
                                color: "#1565c0"
                            }}
                        >
                            Tecno Soporte
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Gestión de servicios
                        </Typography>

                    </Box>

                </Box>

                {/* ESPACIADOR */}

                <Box
                    sx={{
                        flexGrow: 1
                    }}
                />

                {/* INFORMACIÓN DEL USUARIO */}

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5
                    }}
                >

                    <Avatar
                        sx={{
                            width: 38,
                            height: 38,
                            backgroundColor: "#e3f2fd",
                            color: "#1565c0",
                            fontWeight: 700
                        }}
                    >
                        {inicial}
                    </Avatar>

                    <Box
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block"
                            }
                        }}
                    >

                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 600
                            }}
                        >
                            {nombreUsuario}
                        </Typography>

                        <Chip
                            label={rol}
                            size="small"
                            sx={{
                                height: 20,
                                fontSize: 11,
                                fontWeight: 700,
                                backgroundColor: "#e8f5e9",
                                color: "#2e7d32"
                            }}
                        />

                    </Box>

                    {/* CERRAR SESIÓN */}

                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        onClick={cerrarSesion}
                        sx={{
                            ml: {
                                xs: 0.5,
                                sm: 1
                            },
                            borderColor: "#d0d7de",
                            color: "#455a64",
                            textTransform: "none",
                            fontWeight: 600,
                            borderRadius: 2,

                            "&:hover": {
                                borderColor: "#1565c0",
                                backgroundColor: "#f5f9ff",
                                color: "#1565c0"
                            }
                        }}
                    >
                        <Box
                            component="span"
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "inline"
                                }
                            }}
                        >
                            Cerrar sesión
                        </Box>
                    </Button>

                </Box>

            </Toolbar>

        </AppBar>
    );
};

export default Navbar;
