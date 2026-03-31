import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from './reserva.entity';

@Entity('acompanante')
export class Acompanante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'reserva_id' })
  reservaId: number;

  @Column({ name: 'nombre_completo', length: 150 })
  nombreCompleto: string;

  @Column({ name: 'documento_identidad', length: 50, nullable: true })
  documentoIdentidad: string;

  @ManyToOne(() => Reserva, (reserva) => reserva.acompanantes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reserva_id' })
  reserva: Reserva;
}