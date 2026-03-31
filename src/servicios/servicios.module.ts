import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { ContactoServicio } from '../reservas/entities/contacto_servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactoServicio])],
  controllers: [ServiciosController],
  providers: [ServiciosService],
})
export class ServiciosModule {}