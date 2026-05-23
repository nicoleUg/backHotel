import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { ReservasRepository } from '../repositories/reservas.repository';
import { CrearReservaDto } from '../dto/crear_reserva.dto';
import { HabitacionFactory } from '../patterns/habitacion.factory';
@Injectable()
export class ReservasService {
  constructor(private readonly reservasRepository: ReservasRepository) { }

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
      throw new BadRequestException(`La habitación ${habitacion.tipoHabitacionNombre} solo permite hasta ${caracteristicas.capacidadBase} personas.`);
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
    const MILISEGUNDOS = 1000;
    const SEGUNDOS = 60;
    const MINUTOS = 60;
    const HORAS_AL_DIA = 24;
    const MILLISEGUNDOS_POR_DIA = MILISEGUNDOS * SEGUNDOS * MINUTOS * HORAS_AL_DIA;
    const LIMITE_DIAS_ANTICIPACION = 2;
    const MONTO_MORA_POR_CANCELACION = 50.00;
    const diasAnticipacion = Math.ceil(diferenciaMilisegundos / MILLISEGUNDOS_POR_DIA); //ya refactorizado el code smell

    await this.reservasRepository.actualizarEstadoReserva(reserva, 'Cancelada');

    let montoMora = 0;

    if (diasAnticipacion <= LIMITE_DIAS_ANTICIPACION) {
      montoMora = MONTO_MORA_POR_CANCELACION;
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