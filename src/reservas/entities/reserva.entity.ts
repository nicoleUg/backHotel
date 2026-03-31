import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, OneToMany, Check } from 'typeorm';
import { MoraCancelacion } from './mora_cancelacion.entity';
import { Huesped } from './huesped.entity';
import { Habitacion } from './habitacion.entity';
import { Acompanante } from './acompanante.entity';

@Entity('reserva') 
@Check('reserva_estado_check', `"estado" IN ('Confirmada', 'Check In', 'Check Out', 'Cancelada')`)
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'titular_id' })
  titularId: number;

  @Column({ name: 'habitacion_id' })
  habitacionId: number;

  @Column({ name: 'fecha_reserva_inicio', type: 'date' })
  fechaReservaInicio: string;

  @Column({ name: 'fecha_reserva_salida', type: 'date' })
  fechaReservaSalida: string;

  @Column({ name: 'cantidad_personas' })
  cantidadPersonas: number;

  @Column({ name: 'estado', length: 50, default: 'Confirmada' })
  estado: string;

  // Se agregan las fechas reales para cumplir con la HU-04 y dejar lista la HU-08
  @Column({ name: 'fecha_hora_checkin', type: 'timestamp', nullable: true })
  fechaHoraCheckin: Date;

  @Column({ name: 'fecha_hora_checkout', type: 'timestamp', nullable: true })
  fechaHoraCheckout: Date;

  // ==========================================
  // RELACIONES (Para navegar entre las tablas)
  // ==========================================

  // 1. Relación con el Titular (Huésped - HU-01 y HU-02)
  @ManyToOne(() => Huesped, (huesped) => huesped.reservas)
  @JoinColumn({ name: 'titular_id' })
  titular: Huesped;

  @ManyToOne(() => Habitacion, (habitacion) => habitacion.reservas)
  @JoinColumn({ name: 'habitacion_id' })
  habitacion: Habitacion;

  @OneToMany(() => Acompanante, (acompanante) => acompanante.reserva)
  acompanantes: Acompanante[];

  @OneToOne(() => MoraCancelacion, (mora) => mora.reserva)
  moraCancelacion: MoraCancelacion;
}