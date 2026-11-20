// Componente encargado de mostrar la tabla de clientes
function EmpleadoTable({ empleados, onEditar, onEliminar, editable = true }) {
  return (
    <table className="empleado-table">

      {/* Encabezado de la tabla */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>

      {/* Cuerpo de la tabla */}
      <tbody>

        {/* Recorre la lista de empleados y crea una fila por cada registro */}
        {empleados.map((empleado) => (
          <tr key={empleado.idEmpleado}>
            <td>{empleado.idEmpleado}</td>
            <td>{empleado.nombres}</td>
            <td>{empleado.apellidos}</td>
            <td>{empleado.correoElectronico}</td>

            <td>
              {!editable ? <span className="text-muted">Solo lectura</span> : null}
              {/* Envía el empleado seleccionado al formulario para editarlo */}
              {editable && <button
                type="button"
                className="btn-edit"
                onClick={() => onEditar(empleado)}
              >
                Editar
              </button>}

              {/* Envía el ID del empleado para eliminarlo */}
              {editable && <button
                type="button"
                className="btn-delete"
                onClick={() => onEliminar(empleado.idEmpleado)}
              >
                Eliminar
              </button>}
            </td>
          </tr>
        ))}

      </tbody>
    </table>
  )
}

export default EmpleadoTable