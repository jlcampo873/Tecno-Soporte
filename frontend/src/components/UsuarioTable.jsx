import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'

function UsuarioTable({ usuarios, onEditar, onEliminar }) {

  const obtenerIniciales = (usuario) => {
    const nombres = usuario.nombres?.trim() || ''
    const apellidos = usuario.apellidos?.trim() || ''

    const inicialNombre = nombres.charAt(0)
    const inicialApellido = apellidos.charAt(0)

    return `${inicialNombre}${inicialApellido}`.toUpperCase()
  }

  const obtenerNombreCompleto = (usuario) => {
    return `${usuario.nombres || ''} ${usuario.apellidos || ''}`.trim()
  }

  const obtenerColorRol = (rol) => {
    switch (rol) {
      case 'ADMIN':
        return 'primary'

      case 'TECNICO':
        return 'warning'

      case 'EMPLEADO':
        return 'info'

      default:
        return 'default'
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
    >
      <table className="empleado-table">

        <thead>
          <tr>
            <th>Usuario</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {usuarios.map((usuario) => (

            <tr key={usuario.id}>

              {/* Usuario */}
              <td>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5
                  }}
                >

                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      fontSize: 14,
                      fontWeight: 700,
                      backgroundColor: 'primary.main'
                    }}
                  >
                    {obtenerIniciales(usuario) || (
                      <PersonIcon />
                    )}
                  </Avatar>

                  <Box>

                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700
                      }}
                    >
                      {obtenerNombreCompleto(usuario)}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      ID #{usuario.id}
                    </Typography>

                  </Box>

                </Box>
              </td>

              {/* Correo */}
              <td>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {usuario.correo}
                </Typography>
              </td>

              {/* Rol */}
              <td>
                <Chip
                  label={usuario.rol}
                  color={obtenerColorRol(usuario.rol)}
                  size="small"
                  sx={{
                    fontWeight: 700
                  }}
                />
              </td>

              {/* Estado */}
              <td>
                <Chip
                  label={
                    usuario.activo
                      ? 'Activo'
                      : 'Inactivo'
                  }
                  color={
                    usuario.activo
                      ? 'success'
                      : 'default'
                  }
                  size="small"
                  variant={
                    usuario.activo
                      ? 'filled'
                      : 'outlined'
                  }
                  sx={{
                    fontWeight: 600
                  }}
                />
              </td>

              {/* Acciones */}
              <td>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}
                >

                  <Tooltip title="Editar usuario">
                    <IconButton
                      color="primary"
                      size="small"
                      onClick={() =>
                        onEditar(usuario)
                      }
                      aria-label={`Editar usuario ${obtenerNombreCompleto(usuario)}`}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Eliminar usuario">
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() =>
                        onEliminar(usuario.id)
                      }
                      aria-label={`Eliminar usuario ${obtenerNombreCompleto(usuario)}`}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>

                </Box>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </Box>
  )
}

export default UsuarioTable
