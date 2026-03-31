import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HuespedesService } from './huespedes.service';
import { HuespedesController } from './huespedes.controller';
import { Huesped } from './huesped.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Huesped])],
  controllers: [HuespedesController],
  providers: [HuespedesService],
})
export class HuespedesModule {}