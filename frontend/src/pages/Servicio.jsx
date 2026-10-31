import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import ServicioTable from '../components/ServicioTable'

import {
    getServicios,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} from '../services/servicioService'

import '../styles/Empleado.css'

function Servicio() {

    const { tieneRol } = useContext(AuthContext)
    const editable = tieneRol("ADMIN")

    const [servicio, setServicio] = useState({

        nombreServicio: '',
        descripcion: '',
        precioBase: '',
        duracionEstimada: '',
        activo: true

    })

    const [servicios, setServicios] = useState([])

    const [modoEdicion, setModoEdicion] = useState(false)

    const [idEditando, setIdEditando] = useState(null)

    const handleChange = (e) => {

        const { name, value } = e.target

        setServicio({

            ...servicio,

            [name]: value

        })

    }

    const obtenerServicios = async () => {

        try {

            const respuesta = await getServicios()

            setServicios(respuesta.data)

        } catch (error) {

            console.error("Error al obtener servicios:", error)

        }

    }

    useEffect(() => {

        obtenerServicios()

    }, [])

    const limpiarFormulario = () => {

        setServicio({

            nombreServicio: '',
            descripcion: '',
            precioBase: '',
            duracionEstimada: '',
            activo: true

        })

        setModoEdicion(false)

        setIdEditando(null)

    }

    const editarServicio = (servicioSeleccionado) => {

        setServicio({

            nombreServicio: servicioSeleccionado.nombreServicio,
            descripcion: servicioSeleccionado.descripcion,
            precioBase: servicioSeleccionado.precioBase,
            duracionEstimada: servicioSeleccionado.duracionEstimada,
            activo: servicioSeleccionado.activo

        })

        setIdEditando(servicioSeleccionado.idServicio)

        setModoEdicion(true)

    }

    const guardarServicio = async () => {

        if (!editable) return

        try {

            if (

                !servicio.nombreServicio ||

                !servicio.descripcion ||

                !servicio.precioBase ||

                !servicio.duracionEstimada

            ) {

                alert("Complete todos los campos obligatorios")

                return

            }

            if (modoEdicion) {

                await actualizarServicio(

                    idEditando,

                    servicio

                )

            }

            else {

                await crearServicio(servicio)

            }

            limpiarFormulario()

            obtenerServicios()

        }

        catch (error) {

            console.error("Error al guardar servicio:", error)

        }

    }

    const borrarServicio = async (idServicio) => {

        if (!editable) return

        const confirmar = window.confirm(

            "¿Desea eliminar este servicio?"

        )

        if (!confirmar) return

        try {

            await eliminarServicio(idServicio)

            obtenerServicios()

        }

        catch (error) {

            console.error("Error eliminando servicio:", error)

        }

    }

    return (

        <section className="empleado-module">

            <div className="module-header">

                <div>

                    <span className="module-tag">

                        Módulo Servicios

                    </span>

                    <h2>

                        Gestión de Servicios

                    </h2>

                    <p>

                        Administre el catálogo de servicios técnicos ofrecidos por la empresa.

                    </p>

                </div>

            </div>

            <div className="card">

                <h3>

                    {modoEdicion ?

                        "Editar Servicio"

                        :

                        "Formulario Servicio"}

                </h3>

                <form className="empleado-form">

                    <div className="form-group">

                        <label>

                            Nombre del Servicio

                        </label>

                        <input

                            type="text"

                            name="nombreServicio"

                            value={servicio.nombreServicio}

                            onChange={handleChange}
                            disabled={!editable}

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Descripción

                        </label>

                        <input

                            type="text"

                            name="descripcion"

                            value={servicio.descripcion}

                            onChange={handleChange}
                            disabled={!editable}

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Precio Base

                        </label>

                        <input

                            type="number"

                            name="precioBase"

                            value={servicio.precioBase}

                            onChange={handleChange}
                            disabled={!editable}

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Duración Estimada (Horas)

                        </label>

                        <input

                            type="number"

                            name="duracionEstimada"

                            value={servicio.duracionEstimada}

                            onChange={handleChange}
                            disabled={!editable}

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Estado

                        </label>

                        <select

                            name="activo"

                            value={servicio.activo}

                            onChange={(e) =>

                                setServicio({

                                    ...servicio,

                                    activo: e.target.value === "true"

                                })

                            }
                            disabled={!editable}

                        >

                            <option value="true">

                                Activo

                            </option>

                            <option value="false">

                                Inactivo

                            </option>

                        </select>

                    </div>

                    <div className="form-actions">

                        <button

                            type="button"

                            className="btn-primary"

                            onClick={guardarServicio}
                            disabled={!editable}

                        >

                            {modoEdicion ?

                                "Actualizar"

                                :

                                "Guardar"}

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

            <div className="card">

                <div className="table-title">

                    <h3>

                        Servicios Registrados

                    </h3>

                    <p>

                        Catálogo de servicios almacenados en MySQL.

                    </p>

                </div>

                <div className="table-container">

                    <ServicioTable

                        servicios={servicios}

                        onEditar={editarServicio}

                        onEliminar={borrarServicio}

                    />

                </div>

            </div>

        </section>

    )

}

export default Servicio