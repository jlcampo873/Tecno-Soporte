package com.tecsoporte.tecsoporte.service; // Define el paquete donde se ubica la capa de servicio

// Importa la clase List para manejar colecciones de clientes
import java.util.List;

// Importa Optional para manejar búsquedas que pueden o no devolver un resultado
import java.util.Optional;

// Importa la anotación Service para indicar que esta clase pertenece a la capa de lógica de negocio
import org.springframework.stereotype.Service;

// Importa la entidad Cliente
import com.tecsoporte.tecsoporte.model.Empleado;

// Importa el repositorio ClienteRepository para acceder a la base de datos
import com.tecsoporte.tecsoporte.repository.EmpleadoRepository;

/*
    @Service indica que esta clase pertenece
    a la capa de servicios.

    Esta capa contiene la lógica del negocio
    y sirve como intermediaria entre el Controller
    y el Repository.
*/
@Service
public class EmpleadoService {

    /*
        Se declara una variable final del repositorio.

        El Repository permite acceder a los datos
        de la tabla empleado en MySQL.
    */
    private final EmpleadoRepository empleadoRepository;

    /*
        Constructor de la clase EmpleadoService.

        Spring Boot utiliza este constructor para inyectar
        automáticamente una instancia de EmpleadoRepository.

        Esta es una forma recomendada de inyección de dependencias.
    */
    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }

    /*
        Método para listar todos los empleados.

        Llama al método findAll() del Repository,
        el cual consulta todos los registros de la tabla empleado.
    */
    public List<Empleado> listarEmpleados() {
        return empleadoRepository.findAll();
    }

    /*
        Método para buscar un empleado por su ID.

        Retorna un Optional<Empleado>, porque puede ocurrir
        que el empleado exista o que no exista en la base de datos.
    */
    public Optional<Empleado> buscarEmpleadoPorId(Long idEmpleado) {
        return empleadoRepository.findById(idEmpleado);
    }

    /*
        Método para guardar un empleado.

        Si el empleado no tiene ID, se crea un nuevo registro.
        Si el empleado ya tiene ID, se actualiza el registro existente.

        Aquí más adelante podemos agregar validaciones de negocio.
    */
    public Empleado guardarEmpleado(Empleado empleado) {
        return empleadoRepository.save(empleado);
    }

    /*
        Método para eliminar un empleado por su ID.

        Antes de eliminar, se valida si el empleado existe.
        Esto evita intentar eliminar registros inexistentes.
    */
    public boolean eliminarEmpleado(Long idEmpleado) {

        // Verifica si existe un empleado con el ID recibido
        if (empleadoRepository.existsById(idEmpleado)) {

            // Elimina el empleado por ID
            empleadoRepository.deleteById(idEmpleado);

            // Retorna true para indicar que sí se eliminó
            return true;
        }

        // Retorna false si el empleado no existe
        return false;
    }
}
