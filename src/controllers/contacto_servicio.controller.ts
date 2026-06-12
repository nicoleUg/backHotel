import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactoServicioService } from '../services/contacto_servicio.service';
import { ContactoServicio } from '../entities/contacto_servicio.entity';

@ApiTags('contacto-servicio')
@Controller('contacto-servicio')
export class ContactoServicioController {
  constructor(private readonly contactoServicioService: ContactoServicioService) {}

  @Get()
  findAll(): Promise<ContactoServicio[]> {
    return this.contactoServicioService.findAll();
  }
}
