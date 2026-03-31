import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Huesped } from './huesped.entity';
import { CrearHuespedDto } from './dto/crear_huesped.dto';

@Injectable()
export class HuespedesService {
  constructor(
    @InjectRepository(Huesped)
    private huespedRepository: Repository<Huesped>,
  ) {}

  async crear(crearHuespedDto: CrearHuespedDto) {
    // 1. Verificar si ya existe el documento (Criterio de aceptación 3)
    const existeHuesped = await this.huespedRepository.findOne({
      where: {
        tipoDocumento: crearHuespedDto.tipoDocumento,
        numeroDocumento: crearHuespedDto.numeroDocumento,
      },
    });

    if (existeHuesped) {
      throw new ConflictException(`El huésped con ${crearHuespedDto.tipoDocumento} ${crearHuespedDto.numeroDocumento} ya está registrado.`);
    }

    // 2. Crear y guardar si no existe (Criterio de aceptación 1)
    const nuevoHuesped = this.huespedRepository.create(crearHuespedDto);
    return await this.huespedRepository.save(nuevoHuesped);
  }

  // Método extra para listar huéspedes (Te servirá para el frontend)
  async listarTodos() {
    return await this.huespedRepository.find({ order: { nombre: 'ASC' } });
  }
}