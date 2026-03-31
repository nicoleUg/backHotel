import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReservasRepository } from './reservas.repository'; // Importamos TU repositorio

@Injectable()
export class ReservasService {
  // Inyectamos tu repositorio personalizado
  constructor(private readonly reservasRepository: ReservasRepository) {}

  async cancelarConMora(reservaId: number) {
    // 1. Usamos el repositorio para buscar
    const reserva = await this.reservasRepository.buscarReservaPorId(reservaId);

    if (!reserva) {
      throw new NotFoundException(`La reserva con ID ${reservaId} no existe.`);
    }

    if (reserva.estado !== 'Confirmada') {
      throw new BadRequestException(`Solo se pueden cancelar reservas Confirmadas.`);
    }

    // 2. Reglas de negocio (Matemáticas)
    const fechaHoy = new Date();
    const fechaIngreso = new Date(reserva.fechaReservaInicio);
    
    const diferenciaMilisegundos = fechaIngreso.getTime() - fechaHoy.getTime();
    const diasAnticipacion = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    // 3. Usamos el repositorio para actualizar el estado
    await this.reservasRepository.actualizarEstadoReserva(reserva, 'Cancelada');

    // 4. Evaluamos si aplica mora y usamos el repositorio para guardarla
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