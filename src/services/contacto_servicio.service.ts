import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactoServicio } from '../entities/contacto_servicio.entity';

@Injectable()
export class ContactoServicioService {
  constructor(
    @InjectRepository(ContactoServicio)
    private readonly contactoServicioRepository: Repository<ContactoServicio>,
  ) {}

  async findAll(): Promise<ContactoServicio[]> {
    return this.contactoServicioRepository.find();
  }
}
