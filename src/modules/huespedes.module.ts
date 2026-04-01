import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HuespedesService } from '../services/huespedes.service';
import { HuespedesController } from '../controllers/huespedes.controller';
import { Huesped } from '../entities/huesped.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Huesped])],
  controllers: [HuespedesController],
  providers: [HuespedesService],
})
export class HuespedesModule {}