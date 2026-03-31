import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { MoraCancelacion } from './entities/mora_cancelacion.entity';

@Injectable()
export class ReservasRepository {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaDb: Repository<Reserva>,
    @InjectRepository(MoraCancelacion)
    private readonly moraDb: Repository<MoraCancelacion>,
  ) {}

  async buscarReservaPorId(id: number): Promise<Reserva | null> {
    return this.reservaDb.findOne({ where: { id } });
  }

  async actualizarEstadoReserva(reserva: Reserva, nuevoEstado: string): Promise<Reserva> {
    reserva.estado = nuevoEstado;
    return this.reservaDb.save(reserva);
  }

  async guardarMora(reservaId: number, monto: number, fecha: Date): Promise<MoraCancelacion> {
    const nuevaMora = this.moraDb.create({
      reservaId: reservaId,
      montoMora: monto,
      fechaCancelacion: fecha,
    });
    return this.moraDb.save(nuevaMora);
  }
}