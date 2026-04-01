import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservasModule } from './modules/reservas.module';
import { HuespedesModule } from './modules/huespedes.module';
import { ContactoServicioModule } from './modules/contacto_servicio.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: { rejectUnauthorized: false },
        autoLoadEntities: true,
        synchronize: false, 
      }),
    }),
    ReservasModule, 
    HuespedesModule,
    ContactoServicioModule,
  ],
})
export class AppModule {}