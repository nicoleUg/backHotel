import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Habitacion } from './habitacion.entity';

@Entity('tipo_habitacion')
export class TipoHabitacion {
  // Usamos el nombre como identificador unico de tipo de habitacion
  @PrimaryColumn({ length: 100 })
  nombre: string;

  @Column({ name: 'capacidad_base' })
  capacidadBase: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'precio_referencial', type: 'decimal', precision: 10, scale: 2 })
  precioReferencial: number;

  @OneToMany(() => Habitacion, (habitacion) => habitacion.tipoHabitacion)
  habitaciones: Habitacion[];
}