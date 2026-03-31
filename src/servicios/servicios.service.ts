import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactoServicio } from '../reservas/entities/contacto_servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(ContactoServicio)
    private serviciosDb: Repository<ContactoServicio>,
  ) {}

  async obtenerTodos() {
    return this.serviciosDb.find(); 
  }
}