import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasController } from '../controllers/Reservas.controller';
import { ReservasService } from '../services/reservas.service';
import { ReservasRepository } from '../repositories/reservas.repository'; // <-- Lo importamos
import { Reserva } from '../entities/reserva.entity';
import { MoraCancelacion } from '../entities/mora_cancelacion.entity';
import { Huesped } from '../entities/huesped.entity';
import { Habitacion } from '../entities/habitacion.entity';
import { Acompanante } from '../entities/acompanante.entity';
import { TipoHabitacion } from '../entities/tipo_habitacion.entity';
import { ContactoServicio } from '../entities/contacto_servicio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reserva,
      MoraCancelacion,
      Huesped,
      Habitacion,
      Acompanante,
      TipoHabitacion,
      ContactoServicio,
    ]),
  ],
  controllers: [ReservasController],
  providers: [ReservasService, ReservasRepository], 
})
export class ReservasModule {}