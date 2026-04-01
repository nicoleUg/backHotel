import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('contacto_servicio')
export class ContactoServicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nombre_servicio', length: 100 })
  nombreServicio: string;

  @Column({ length: 150 })
  encargado: string;

  @Column({ length: 50 })
  telefono: string;
}