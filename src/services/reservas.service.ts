import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { ReservasRepository } from '../repositories/reservas.repository';
import { CrearReservaDto } from '../dto/crear_reserva.dto';
import { HabitacionFactory } from '../patterns/habitacion.factory';
@Injectable()
export class ReservasService {
  constructor(private readonly reservasRepository: ReservasRepository) {}

  async listarReservas() {
    return this.reservasRepository.obtenerTodas();
  }

  async crearReserva(dto: CrearReservaDto) {
    const fechaIngreso = new Date(dto.fechaReservaInicio);
    const fechaSalida = new Date(dto.fechaReservaSalida);
    
    if (fechaSalida <= fechaIngreso) {
      throw new BadRequestException('La fecha de salida debe ser estrictamente posterior a la fecha de ingreso.');
    }

    const habitacion = await this.reservasRepository.buscarHabitacion(dto.habitacionId);
    if (!habitacion) {
      throw new NotFoundException('La habitación seleccionada no existe.');
    }
    const caracteristicas = HabitacionFactory.obtenerCaracteristicas(habitacion.tipoHabitacionNombre);

    if (dto.cantidadPersonas > caracteristicas.capacidadBase) {
      throw new BadRequestException(`Aplicando patrón Factory: La habitación ${habitacion.tipoHabitacionNombre} solo permite hasta ${caracteristicas.capacidadBase} personas.`);
    }
    if (dto.cantidadPersonas > habitacion.tipoHabitacion.capacidadBase) {
      throw new BadRequestException(`La habitación ${habitacion.numero} (${habitacion.tipoHabitacion.nombre}) solo permite hasta ${habitacion.tipoHabitacion.capacidadBase} personas.`);
    }

    const hayChoque = await this.reservasRepository.existeSolapamiento(dto.habitacionId, dto.fechaReservaInicio, dto.fechaReservaSalida);
    if (hayChoque) {
      throw new ConflictException('La habitación ya está ocupada en ese rango de fechas.');
    }

    return await this.reservasRepository.crear({
      titularId: dto.titularId,
      habitacionId: dto.habitacionId,
      fechaReservaInicio: dto.fechaReservaInicio,
      fechaReservaSalida: dto.fechaReservaSalida,
      cantidadPersonas: dto.cantidadPersonas,
      estado: 'Confirmada'
    });
  }
  async registrarCheckIn(reservaId: number) {
    const reserva = await this.reservasRepository.buscarReservaPorId(reservaId);

    if (!reserva) {
      throw new NotFoundException(`La reserva con ID ${reservaId} no existe.`);
    }

    if (reserva.estado === 'Cancelada') {
      throw new BadRequestException('No se puede hacer check-in de una reserva que fue cancelada.');
    }

    if (reserva.estado === 'Check In' || reserva.fechaHoraCheckin !== null) {
      throw new BadRequestException('Esta reserva ya tiene un check-in registrado.');
    }

    if (reserva.estado === 'Check Out') {
      throw new BadRequestException('Esta reserva ya finalizó (tiene check-out).');
    }

    const fechaActual = new Date();
    await this.reservasRepository.registrarCheckIn(reserva, fechaActual);

    return {
      mensaje: 'Check-in registrado exitosamente',
      reservaId: reserva.id,
      estado: 'Check In',
      fechaHoraCheckin: fechaActual
    };
  }
  async cancelarConMora(reservaId: number) {
    const reserva = await this.reservasRepository.buscarReservaPorId(reservaId);

    if (!reserva) {
      throw new NotFoundException(`La reserva con ID ${reservaId} no existe.`);
    }

    if (reserva.estado !== 'Confirmada') {
      throw new BadRequestException(`Solo se pueden cancelar reservas Confirmadas.`);
    }

    const fechaHoy = new Date();
    const fechaIngreso = new Date(reserva.fechaReservaInicio);
    
    const diferenciaMilisegundos = fechaIngreso.getTime() - fechaHoy.getTime();
    const diasAnticipacion = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    await this.reservasRepository.actualizarEstadoReserva(reserva, 'Cancelada');

    let montoMora = 0;
    
    if (diasAnticipacion <= 2) {
      montoMora = 50.00;
      await this.reservasRepository.guardarMora(reserva.id, montoMora, fechaHoy);
    }

    return {
      mensaje: 'Reserva cancelada correctamente',
      reservaId: reserva.id,
      estado: 'Cancelada',
      moraAplicada: montoMora > 0,
      montoMora: montoMora
    };
  }
}