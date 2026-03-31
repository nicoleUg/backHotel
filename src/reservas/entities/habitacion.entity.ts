import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TipoHabitacion } from './tipo_habitacion.entity';
import { Reserva } from './reserva.entity';

@Entity('habitacion')
export class Habitacion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  numero: string;

  @Column({ name: 'tipo_habitacion_nombre', length: 100 })
  tipoHabitacionNombre: string;

  @ManyToOne(() => TipoHabitacion, (tipo) => tipo.habitaciones)
  @JoinColumn({ name: 'tipo_habitacion_nombre' })
  tipoHabitacion: TipoHabitacion;

  @OneToMany(() => Reserva, (reserva) => reserva.habitacion)
  reservas: Reserva[];
}