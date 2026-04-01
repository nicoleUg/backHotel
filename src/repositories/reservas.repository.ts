import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../entities/reserva.entity';
import { MoraCancelacion } from '../entities/mora_cancelacion.entity';
import { Habitacion } from '../entities/habitacion.entity';
@Injectable()
export class ReservasRepository {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaDb: Repository<Reserva>,
    @InjectRepository(MoraCancelacion)
    private readonly moraDb: Repository<MoraCancelacion>,
    @InjectRepository(Habitacion)
    private readonly habitacionDb: Repository<Habitacion>
  ) {}
async obtenerTodas(): Promise<Reserva[]> {
    return this.reservaDb.find({
      relations: ['titular', 'habitacion', 'habitacion.tipoHabitacion'],
      order: { fechaReservaInicio: 'ASC' }
    });
  }
  async buscarHabitacion(id: number): Promise<Habitacion | null> {
    return this.habitacionDb.findOne({ 
      where: { id }, 
      relations: ['tipoHabitacion'] 
    });
  }
  async existeSolapamiento(habitacionId: number, ingreso: string, salida: string): Promise<boolean> {
    const superposiciones = await this.reservaDb.createQueryBuilder('reserva')
      .where('reserva.habitacion_id = :habitacionId', { habitacionId })
      .andWhere('reserva.estado != :estadoCancelado', { estadoCancelado: 'Cancelada' })
      .andWhere('(reserva.fecha_reserva_inicio < :salida AND reserva.fecha_reserva_salida > :ingreso)', { ingreso, salida })
      .getCount();
      
    return superposiciones > 0;
  }

  async crear(datos: Partial<Reserva>): Promise<Reserva> {
    const nuevaReserva = this.reservaDb.create(datos);
    return this.reservaDb.save(nuevaReserva);
  }
  async registrarCheckIn(reserva: Reserva, fecha: Date): Promise<Reserva> {
    reserva.estado = 'Check In';
    reserva.fechaHoraCheckin = fecha;
    return this.reservaDb.save(reserva);
  }
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