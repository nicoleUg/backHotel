import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactoServicio } from '../entities/contacto_servicio.entity';
import { ContactoServicioController } from '../controllers/contacto_servicio.controller';
import { ContactoServicioService } from '../services/contacto_servicio.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactoServicio])],
  controllers: [ContactoServicioController],
  providers: [ContactoServicioService],
})
export class ContactoServicioModule {}
