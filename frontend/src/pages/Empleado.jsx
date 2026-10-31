import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import EmpleadoTable from '../components/EmpleadoTable'

import {
  getEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado
} from '../services/empleadoService'

import '../styles/Empleado.css'

function Empleado() {

  const { tieneRol } = useContext(AuthContext)
  const editable = tieneRol("ADMIN")

  const [empleado, setEmpleado] = useState({
    nombres: '',
    apellidos: '',
    correoElectronico: ''
  })

  const [empleados, setEmpleados] = useState([])

  const [modoEdicion, setModoEdicion] = useState(false)

  const [idEditando, setIdEditando] = useState(null)

  const handleChange = (e) => {
    setEmpleado({
      ...empleado,
      [e.target.name]: e.target.value
    })
  }

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await getEmpleados()
      setEmpleados(respuesta.data)
    } catch (error) {
      console.error('Error al obtener empleados:', error)
    }
  }

  useEffect(() => {
    obtenerEmpleados()
  }, [])

  const limpiarFormulario = () => {
    setEmpleado({
      nombres: '',
      apellidos: '',
      correoElectronico: ''
    })

    setModoEdicion(false)
    setIdEditando(null)
  }

  const editarEmpleado = (empleadoSeleccionado) => {
    setEmpleado({
      nombres: empleadoSeleccionado.nombres,
      apellidos: empleadoSeleccionado.apellidos,
      correoElectronico: empleadoSeleccionado.correoElectronico
    })

    setIdEditando(empleadoSeleccionado.idEmpleado)
    setModoEdicion(true)
  }

  const guardarEmpleado = async () => {
    if (!editable) return
    try {
      if (modoEdicion) {

        await actualizarEmpleado(idEditando, empleado)
        console.log('Empleado actualizado correctamente')
      } else {

        await crearEmpleado(empleado)
        console.log('Empleado guardado correctamente')
      }

      limpiarFormulario()
      obtenerEmpleados()

    } catch (error) {
      console.error('Error al guardar o actualizar empleado:', error)
    }
  }

  const borrarEmpleado = async (idEmpleado) => {
    if (!editable) return

    const confirmar = window.confirm(
      '¿Está seguro de eliminar este empleado?'
    )

    if (!confirmar) {
      return
    }

    try {

      await eliminarEmpleado(idEmpleado)

      obtenerEmpleados()

      console.log('Empleado eliminado correctamente')

    } catch (error) {
      console.error('Error al eliminar empleado:', error)
    }
  }

  return (
    <section className="empleado-module">

      {/* Encabezado del módulo */}
      <div className="module-header">
        <div>
          <span className="module-tag">Módulo Empleado</span>
          <h2>Gestión de Empleados</h2>
          <p>Registra, consulta y administra la información básica de los empleados.</p>
        </div>
      </div>

      {/* Tarjeta del formulario */}
      <div className="card form-card">
        <h3>
          {modoEdicion ? 'Editar Cliente' : 'Formulario Empleado'}
        </h3>

        <form className="empleado-form">

          {/* Campo nombres */}
          <div className="form-group">
            <label>Nombres</label>
            <input
              type="text"
              name="nombres"
              value={empleado.nombres}
              onChange={handleChange}
              disabled={!editable}
              placeholder="Ingrese los nombres"
            />
          </div>

          {/* Campo apellidos */}
          <div className="form-group">
            <label>Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={empleado.apellidos}
              onChange={handleChange}
              disabled={!editable}
              placeholder="Ingrese los apellidos"
            />
          </div>

          {/* Campo correo */}
          <div className="form-group full">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="correoElectronico"
              value={empleado.correoElectronico}
              onChange={handleChange}
              disabled={!editable}
              placeholder="Ingrese el correo electrónico"
            />
          </div>

          {/* Botones del formulario */}
          <div className="form-actions">

            {/* Guarda o actualiza según el modo */}
            <button
              type="button"
              className="btn-primary"
              onClick={guardarEmpleado}
              disabled={!editable}
            >
              {modoEdicion ? 'Actualizar' : 'Guardar'}
            </button>

            {/* Limpia el formulario y cancela edición */}
            <button
              type="button"
              className="btn-secondary"
              onClick={limpiarFormulario}
            >
              Limpiar
            </button>

          </div>
        </form>
      </div>

      {/* Tarjeta de la tabla */}
      <div className="card table-card">
        <div className="table-title">
          <h3>Empleados Registrados</h3>
          <p>Listado de empleados consultados desde Spring Boot.</p>
        </div>

        {/* Envía datos y funciones al componente tabla */}
        <EmpleadoTable
          empleados={empleados}
          onEditar={editarEmpleado}
          onEliminar={borrarEmpleado}
          editable={editable}
        />
      </div>

    </section>
  )
}

export default Empleado