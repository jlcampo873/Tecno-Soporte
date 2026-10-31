// Componente encargado de mostrar la tabla de solicitudes
function SolicitudTable({ solicitudes, onEditar, onEliminar }) {
  return (
    <table className="solicitud-table">

      {/* Encabezado de la tabla */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Descripción</th>
          <th>Tipo Servicio</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Dirección del Servicio</th> 
          <th>Empleado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      {/* Cuerpo de la tabla */}
      <tbody>
        {solicitudes.map((solicitud) => (
          <tr key={solicitud.idSolicitud}>
            <td>{solicitud.idSolicitud}</td>
            <td>{solicitud.descripcion}</td>
            <td>{solicitud.tipoServicio}</td>
            <td>{solicitud.estado}</td>
            <td>{solicitud.fechaSolicitud}</td>
            <td>{solicitud.direccionServicio}</td>

            {/* Muestra el empleado asociado */}
            <td>
              {solicitud.empleado
                ? `${solicitud.empleado.nombres} ${solicitud.empleado.apellidos}`
                : 'Sin empleado'}
            </td>

            <td>
              <button
                type="button"
                className="btn-edit"
                onClick={() => onEditar(solicitud)}
              >
                Editar
              </button>

              <button
                type="button"
                className="btn-delete"
                onClick={() => onEliminar(solicitud.idSolicitud)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  )
}

export default SolicitudTable