import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';
import { Reserva } from './reserva.entity';

@Entity('huesped')
@Unique('huesped_documento_unico', ['tipoDocumento', 'numeroDocumento'])
export class Huesped {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'tipo_documento', length: 50 })
  tipoDocumento: string;

  @Column({ name: 'numero_documento', length: 50 })
  numeroDocumento: string;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 50, nullable: true })
  telefono: string;

  @Column({ length: 100, nullable: true })
  correo: string;

  @OneToMany(() => Reserva, (reserva) => reserva.titular)
  reservas: Reserva[];
}