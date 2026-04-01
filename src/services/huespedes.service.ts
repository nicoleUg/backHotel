import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Huesped } from '../entities/huesped.entity';
import { CrearHuespedDto } from '../dto/crear_huesped.dto';

@Injectable()
export class HuespedesService {
  constructor(
    @InjectRepository(Huesped)
    private huespedRepository: Repository<Huesped>,
  ) {}

  async crear(crearHuespedDto: CrearHuespedDto) {
    const existeHuesped = await this.huespedRepository.findOne({
      where: {
        tipoDocumento: crearHuespedDto.tipoDocumento,
        numeroDocumento: crearHuespedDto.numeroDocumento,
      },
    });

    if (existeHuesped) {
      throw new ConflictException(`El huésped con ${crearHuespedDto.tipoDocumento} ${crearHuespedDto.numeroDocumento} ya está registrado.`);
    }

    const nuevoHuesped = this.huespedRepository.create(crearHuespedDto);
    return await this.huespedRepository.save(nuevoHuesped);
  }

  async listarTodos() {
    return await this.huespedRepository.find({ order: { nombre: 'ASC' } });
  }
}