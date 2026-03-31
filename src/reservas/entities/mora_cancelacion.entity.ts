import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Reserva } from './reserva.entity';

@Entity('mora_cancelacion')
export class MoraCancelacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reserva_id', unique: true })
  reservaId: number;

  @Column({ name: 'fecha_cancelacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCancelacion: Date;

  @Column({ name: 'monto_mora', type: 'decimal', precision: 10, scale: 2 })
  montoMora: number;

  // Relación inversa hacia la reserva
  @OneToOne(() => Reserva, (reserva) => reserva.moraCancelacion)
  @JoinColumn({ name: 'reserva_id' })
  reserva: Reserva;
}