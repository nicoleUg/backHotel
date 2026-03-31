import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReservasRepository } from './reservas.repository'; // Importamos TU repositorio

@Injectable()
export class ReservasService {
  constructor(private readonly reservasRepository: ReservasRepository) {}

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