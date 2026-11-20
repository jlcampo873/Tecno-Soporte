import { useEffect, useState } from 'react'
import UsuarioTable from '../components/UsuarioTable'
import {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../services/usuarioService'
import '../styles/Empleado.css'

const usuarioInicial = {
  nombres: '',
  apellidos: '',
  correo: '',
  password: '',
  rol: 'ADMIN',
  activo: true
}

function Usuario() {
  const [usuario, setUsuario] = useState(usuarioInicial)
  const [usuarios, setUsuarios] = useState([])

  const [modoEdicion, setModoEdicion] = useState(false)
  const [idEditando, setIdEditando] = useState(null)

  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')

  const [cargando, setCargando] = useState(false)
  const [cargandoLista, setCargandoLista] = useState(false)

  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje(texto)
    setTipoMensaje(tipo)

    setTimeout(() => {
      setMensaje('')
    }, 4000)
  }

  const obtenerUsuarios = async () => {
    try {
      setCargandoLista(true)

      const respuesta = await listarUsuarios()

      setUsuarios(respuesta.data)
    } catch (error) {
      console.error('Error al obtener usuarios:', error)

      mostrarMensaje(
        error.response?.data?.message ||
          'No fue posible cargar los usuarios.',
        'error'
      )
    } finally {
      setCargandoLista(false)
    }
  }

  useEffect(() => {
    obtenerUsuarios()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setUsuario((anterior) => ({
      ...anterior,
      [name]: value
    }))

    setErrores((anteriores) => ({
      ...anteriores,
      [name]: ''
    }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    const nombres = usuario.nombres.trim()
    const apellidos = usuario.apellidos.trim()
    const correo = usuario.correo.trim()
    const password = usuario.password

    if (!nombres) {
      nuevosErrores.nombres = 'Los nombres son obligatorios.'
    } else if (nombres.length < 2) {
      nuevosErrores.nombres =
        'Los nombres deben tener al menos 2 caracteres.'
    }

    if (!apellidos) {
      nuevosErrores.apellidos = 'Los apellidos son obligatorios.'
    } else if (apellidos.length < 2) {
      nuevosErrores.apellidos =
        'Los apellidos deben tener al menos 2 caracteres.'
    }

    if (!correo) {
      nuevosErrores.correo = 'El correo es obligatorio.'
    } else {
      const correoValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)

      if (!correoValido) {
        nuevosErrores.correo =
          'Ingrese un correo electrónico válido.'
      }
    }

    if (!modoEdicion && !password.trim()) {
      nuevosErrores.password =
        'La contraseña es obligatoria al crear un usuario.'
    }

    if (password && password.trim().length < 6) {
      nuevosErrores.password =
        'La contraseña debe tener al menos 6 caracteres.'
    }

    if (!usuario.rol) {
      nuevosErrores.rol = 'Debe seleccionar un rol.'
    }

    setErrores(nuevosErrores)

    return Object.keys(nuevosErrores).length === 0
  }

  const limpiarFormulario = () => {
    setUsuario({
      ...usuarioInicial
    })

    setErrores({})
    setModoEdicion(false)
    setIdEditando(null)
  }

  const editarUsuario = (usuarioSeleccionado) => {
    setUsuario({
      nombres: usuarioSeleccionado.nombres || '',
      apellidos: usuarioSeleccionado.apellidos || '',
      correo: usuarioSeleccionado.correo || '',
      password: '',
      rol: usuarioSeleccionado.rol || 'EMPLEADO',
      activo: usuarioSeleccionado.activo ?? true
    })

    setErrores({})
    setIdEditando(usuarioSeleccionado.id)
    setModoEdicion(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const guardarUsuario = async (e) => {
    e.preventDefault()

    setMensaje('')

    if (!validarFormulario()) {
      mostrarMensaje(
        'Por favor, corrige los errores del formulario.',
        'error'
      )

      return
    }

    try {
      setCargando(true)

      const datosUsuario = {
        ...usuario,
        nombres: usuario.nombres.trim(),
        apellidos: usuario.apellidos.trim(),
        correo: usuario.correo.trim().toLowerCase()
      }

      if (modoEdicion) {
        await actualizarUsuario(idEditando, datosUsuario)

        mostrarMensaje(
          'Usuario actualizado correctamente.',
          'success'
        )
      } else {
        await crearUsuario(datosUsuario)

        mostrarMensaje(
          'Usuario registrado correctamente.',
          'success'
        )
      }

      limpiarFormulario()
      await obtenerUsuarios()
    } catch (error) {
      console.error(
        'Error al guardar o actualizar usuario:',
        error
      )

      const mensajeError =
        error.response?.data?.message ||
        'No fue posible guardar el usuario.'

      mostrarMensaje(mensajeError, 'error')
    } finally {
      setCargando(false)
    }
  }

  const borrarUsuario = async (idUsuario) => {
    const confirmar = window.confirm(
      '¿Está seguro de eliminar este usuario?'
    )

    if (!confirmar) {
      return
    }

    try {
      setCargando(true)

      await eliminarUsuario(idUsuario)

      mostrarMensaje(
        'Usuario eliminado correctamente.',
        'success'
      )

      await obtenerUsuarios()
    } catch (error) {
      console.error(
        'Error al eliminar usuario:',
        error
      )

      const mensajeError =
        error.response?.data?.message ||
        'No fue posible eliminar el usuario.'

      mostrarMensaje(mensajeError, 'error')
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="empleado-module">

      <div className="module-header">
        <div>
          <span className="module-tag">
            Módulo Usuario
          </span>

          <h2>
            Gestión de Usuarios
          </h2>

          <p>
            Registra, consulta y administra los usuarios
            del sistema.
          </p>
        </div>
      </div>

      {mensaje && (
        <div
          className={`mensaje-${tipoMensaje}`}
          role="alert"
        >
          {mensaje}
        </div>
      )}

      <div className="card form-card">

        <h3>
          {modoEdicion
            ? 'Editar Usuario'
            : 'Registrar Usuario'}
        </h3>

        <form
          className="empleado-form"
          onSubmit={guardarUsuario}
          noValidate
        >

          <div className="form-group">

            <label htmlFor="nombres">
              Nombres
            </label>

            <input
              id="nombres"
              type="text"
              name="nombres"
              value={usuario.nombres}
              onChange={handleChange}
              placeholder="Ingrese los nombres"
              disabled={cargando}
              className={
                errores.nombres ? 'input-error' : ''
              }
            />

            {errores.nombres && (
              <small className="campo-error">
                {errores.nombres}
              </small>
            )}

          </div>

          <div className="form-group">

            <label htmlFor="apellidos">
              Apellidos
            </label>

            <input
              id="apellidos"
              type="text"
              name="apellidos"
              value={usuario.apellidos}
              onChange={handleChange}
              placeholder="Ingrese los apellidos"
              disabled={cargando}
              className={
                errores.apellidos ? 'input-error' : ''
              }
            />

            {errores.apellidos && (
              <small className="campo-error">
                {errores.apellidos}
              </small>
            )}

          </div>

          <div className="form-group">

            <label htmlFor="correo">
              Correo electrónico
            </label>

            <input
              id="correo"
              type="email"
              name="correo"
              value={usuario.correo}
              onChange={handleChange}
              placeholder="Ingrese el correo"
              disabled={cargando}
              className={
                errores.correo ? 'input-error' : ''
              }
            />

            {errores.correo && (
              <small className="campo-error">
                {errores.correo}
              </small>
            )}

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
              placeholder={
                modoEdicion
                  ? 'Dejar vacío para conservar la actual'
                  : 'Ingrese la contraseña'
              }
              disabled={cargando}
              autoComplete={
                modoEdicion
                  ? 'new-password'
                  : 'new-password'
              }
              className={
                errores.password ? 'input-error' : ''
              }
            />

            {modoEdicion && (
              <small>
                Si deja este campo vacío, la contraseña
                actual no será modificada.
              </small>
            )}

            {errores.password && (
              <small className="campo-error">
                {errores.password}
              </small>
            )}

          </div>

          <div className="form-group">

            <label htmlFor="rol">
              Rol
            </label>

            <select
              id="rol"
              name="rol"
              value={usuario.rol}
              onChange={handleChange}
              disabled={cargando}
              className={
                errores.rol ? 'input-error' : ''
              }
            >
              <option value="ADMIN">
                ADMIN
              </option>

              <option value="TECNICO">
                TECNICO
              </option>

              <option value="EMPLEADO">
                EMPLEADO
              </option>
            </select>

            {errores.rol && (
              <small className="campo-error">
                {errores.rol}
              </small>
            )}

          </div>

          <div className="form-actions">

            <button
              type="submit"
              className="btn-primary"
              disabled={cargando}
            >
              {cargando
                ? 'Procesando...'
                : modoEdicion
                  ? 'Actualizar'
                  : 'Guardar'}
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={limpiarFormulario}
              disabled={cargando}
            >
              Limpiar
            </button>

          </div>

        </form>
      </div>

      <div className="card table-card">

        <div className="table-title">

          <h3>
            Usuarios Registrados
          </h3>

          <p>
            Listado de usuarios consultados desde
            Spring Boot.
          </p>

        </div>

        {cargandoLista ? (
          <p>
            Cargando usuarios...
          </p>
        ) : usuarios.length === 0 ? (
          <p>
            No existen usuarios registrados.
          </p>
        ) : (
          <UsuarioTable
            usuarios={usuarios}
            onEditar={editarUsuario}
            onEliminar={borrarUsuario}
          />
        )}

      </div>

    </section>
  )
}

export default Usuario
