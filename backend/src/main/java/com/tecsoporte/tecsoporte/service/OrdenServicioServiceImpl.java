package com.tecsoporte.tecsoporte.service;

import com.tecsoporte.tecsoporte.dto.DetalleOrdenResponse;
import com.tecsoporte.tecsoporte.dto.OrdenServicioResponse;
import com.tecsoporte.tecsoporte.model.Empleado;
import com.tecsoporte.tecsoporte.model.DetalleSolicitud;
import com.tecsoporte.tecsoporte.model.SolicitudServicio;
import com.tecsoporte.tecsoporte.repository.DetalleSolicitudRepository;
import com.tecsoporte.tecsoporte.repository.SolicitudServicioRepository;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrdenServicioServiceImpl
                implements OrdenServicioService {

        private final SolicitudServicioRepository solicitudServicioRepository;
        private final DetalleSolicitudRepository detalleSolicitudRepository;

        public OrdenServicioServiceImpl(
                        SolicitudServicioRepository solicitudServicioRepository,
                        DetalleSolicitudRepository detalleSolicitudRepository) {
                this.solicitudServicioRepository = solicitudServicioRepository;
                this.detalleSolicitudRepository = detalleSolicitudRepository;
        }

        @Override
        public OrdenServicioResponse obtenerOrdenPorSolicitud(
                        Long idSolicitud) {

                SolicitudServicio solicitud = solicitudServicioRepository
                                .findSolicitudByIdSolicitud(idSolicitud)
                                .orElseThrow(
                                                () -> new RuntimeException(
                                                                "Solicitud no encontrada"));

                Empleado empleado = solicitud.getEmpleado();

                List<DetalleSolicitud> detalles = detalleSolicitudRepository
                                .findBySolicitudIdSolicitud(idSolicitud);

                List<DetalleOrdenResponse> detallesResponse = detalles
                                .stream()
                                .map(this::convertirDetalle)
                                .toList();

                BigDecimal totalGeneral = detallesResponse
                                .stream()
                                .map(DetalleOrdenResponse::getSubtotal)
                                .filter(subtotal -> subtotal != null)
                                .reduce(
                                                BigDecimal.ZERO,
                                                BigDecimal::add);

                OrdenServicioResponse orden = new OrdenServicioResponse();

                orden.setIdSolicitud(
                                solicitud.getIdSolicitud());

                orden.setFechaSolicitud(
                                solicitud.getFechaSolicitud());

                orden.setEstadoSolicitud(
                                solicitud.getEstado().name());

                orden.setIdEmpleado(
                                empleado.getIdEmpleado());

                orden.setNombreEmpleado(
                                empleado.getNombres()
                                                + " "
                                                + empleado.getApellidos());

                orden.setCorreoEmpleado(
                                empleado.getCorreoElectronico());

                orden.setDescripcionSolicitud(
                                solicitud.getDescripcion());

                orden.setTipoServicio(
                                solicitud.getTipoServicio());

                orden.setDetalles(
                                detallesResponse);

                orden.setTotalGeneral(
                                totalGeneral);

                return orden;
        }

        private DetalleOrdenResponse convertirDetalle(
                        DetalleSolicitud detalle) {

                DetalleOrdenResponse response = new DetalleOrdenResponse();

                response.setIdDetalle(
                                detalle.getIdDetalle());

                response.setIdServicio(
                                detalle.getServicio().getIdServicio());

                response.setNombreServicio(
                                detalle.getServicio().getNombreServicio());

                response.setIdTecnico(
                                detalle.getTecnico().getIdTecnico());

                response.setNombreTecnico(
                                detalle.getTecnico().getNombres()
                                                + " "
                                                + detalle.getTecnico().getApellidos());

                response.setEspecialidadTecnico(
                                detalle.getTecnico().getEspecialidad());

                response.setCantidad(
                                detalle.getCantidad());

                response.setPrecioUnitario(
                                detalle.getPrecioUnitario());

                response.setSubtotal(
                                detalle.getSubtotal());

                response.setObservaciones(
                                detalle.getObservaciones());

                response.setEstadoDetalle(
                                detalle.getEstadoDetalle().name());

                return response;
        }
}
