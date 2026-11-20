import { useState, useEffect } from 'react'

import { getEmpleados } from '../services/empleadoService'

import {
  getSolicitudes,
  crearSolicitud,
  actualizarSolicitud,
  eliminarSolicitud
} from '../services/solicitudService'

import SolicitudTable from '../components/SolicitudTable'

import '../styles/Solicitud.css'

function SolicitudServicio() {

  const [solicitud, setSolicitud] = useState({
    descripcion: '',
    tipoServicio: '',
    estado: '',
    fechaSolicitud: '',
    direccionServicio: '',
    idEmpleado: ''
  })

  const [empleados, setEmpleados] = useState([])
  const [solicitudes, setSolicitudes] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [idEditando, setIdEditando] = useState(null)

  const obtenerEmpleados = async () => {
    try {
      const respuesta = await getEmpleados()
      setEmpleados(respuesta.data)
    } catch (error) {
      console.error('Error al obtener empleados:', error)
    }
  }

  const obtenerSolicitudes = async () => {
    try {
      const respuesta = await getSolicitudes()
      setSolicitudes(respuesta.data)
    } catch (error) {
      console.error('Error al obtener solicitudes:', error)
    }
  }

  useEffect(() => {
    obtenerEmpleados()
    obtenerSolicitudes()
  }, [])

  const handleChange = (e) => {
    setSolicitud({
      ...solicitud,
      [e.target.name]: e.target.value
    })
  }

  const limpiarFormulario = () => {
    setSolicitud({
      descripcion: '',
      tipoServicio: '',
      estado: '',
      fechaSolicitud: '',
      direccionServicio: '',
      idEmpleado: ''
    })

    setModoEdicion(false)
    setIdEditando(null)
  }

  const editarSolicitud = (solicitudSeleccionada) => {
    setSolicitud({
      descripcion: solicitudSeleccionada.descripcion,
      tipoServicio: solicitudSeleccionada.tipoServicio,
      estado: solicitudSeleccionada.estado,
      fechaSolicitud: solicitudSeleccionada.fechaSolicitud,
      direccionServicio: solicitudSeleccionada.direccionServicio,
      idEmpleado: solicitudSeleccionada.empleado?.idEmpleado || ''
    })

    setIdEditando(solicitudSeleccionada.idSolicitud)
    setModoEdicion(true)
  }

  const guardarSolicitud = async () => {
    try {
      if (!solicitud.idEmpleado) {
        alert('Debe seleccionar un empleado')
        return
      }

      const { idEmpleado, ...datosSolicitud } = solicitud

      if (modoEdicion) {
          await actualizarSolicitud(idEditando, idEmpleado, datosSolicitud)
          } else {
            await crearSolicitud(idEmpleado, datosSolicitud)
          }

          const respuesta = await getSolicitudes()
          setSolicitudes(respuesta.data)
          limpiarFormulario()

    } catch (error) {
      console.error('Error al guardar solicitud:', error)
    }
  }

  const borrarSolicitud = async (idSolicitud) => {
    const confirmar = window.confirm(
      '¿Está seguro de eliminar esta solicitud?'
    )

    if (!confirmar) {
      return
    }

    try {
      await eliminarSolicitud(idSolicitud)
      obtenerSolicitudes()
    } catch (error) {
      console.error('Error al eliminar solicitud:', error)
    }
  }

  return (
    <section className="solicitud-module">

      <div className="module-header">
        <div>
          <span className="module-tag">Módulo Solicitudes</span>
          <h2>Gestión de Solicitudes de Servicio</h2>
          <p>Registra solicitudes asociadas a empleados existentes.</p>
        </div>
      </div>

      <div className="card form-card">
        <h3>
          {modoEdicion ? 'Editar Solicitud' : 'Formulario Solicitud'}
        </h3>

        <form className="solicitud-form">

          <div className="form-group">
            <label>Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={solicitud.descripcion}
              onChange={handleChange}
              placeholder="Ingrese la descripción"
            />
          </div>

          <div className="form-group">
            <label>Tipo de Servicio</label>
            <select
              name="tipoServicio"
              value={solicitud.tipoServicio}
              onChange={handleChange}
            >
              <option value="">Seleccione un tipo</option>
              <option value="INSTALACION">Instalación</option>
              <option value="REPARACION">Reparación</option>
              <option value="MANTENIMIENTO">Mantenimiento</option>
              <option value="CONFIGURACION">Configuración</option>
              <option value="SOPORTE_TECNICO">Soporte técnico</option>
            </select>
          </div>

          <div className="form-group">
            <label>Estado</label>
            <select
              name="estado"
              value={solicitud.estado}
              onChange={handleChange}
            >
              <option value="">Seleccione un estado</option>
              <option value="PENDIENTE">Pendiente</option>
              <option value="EN_PROCESO">En proceso</option>
              <option value="FINALIZADA">Finalizada</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          <div className="form-group">
            <label>Fecha Solicitud</label>
            <input
              type="date"
              name="fechaSolicitud"
              value={solicitud.fechaSolicitud}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Dirección del Servicio</label>
            <input
              type="text"
              name="direccionServicio"
              value={solicitud.direccionServicio}
              onChange={handleChange}
              placeholder="Ingrese la dirección del servicio"
            />
          </div>

          <div className="form-group full">
            <label>Empleado Asociado</label>
            <select
              name="idEmpleado"
              value={solicitud.idEmpleado}
              onChange={handleChange}
            >
              <option value="">Seleccione un empleado</option>

              {empleados.map((empleado) => (
                <option
                  key={empleado.idEmpleado}
                  value={empleado.idEmpleado}
                >
                  {empleado.nombres} {empleado.apellidos}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={guardarSolicitud}
            >
              {modoEdicion ? 'Actualizar' : 'Guardar'}
            </button>

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

      <div className="card table-card">
        <div className="table-title">
          <h3>Solicitudes Registradas</h3>
          <p>Listado de solicitudes consultadas desde Spring Boot.</p>
        </div>

        <SolicitudTable
          solicitudes={solicitudes}
          onEditar={editarSolicitud}
          onEliminar={borrarSolicitud}
        />
      </div>

    </section>
  )
}

export default SolicitudServicio