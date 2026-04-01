import { Controller, Post, Body, Get } from '@nestjs/common';
import { HuespedesService } from '../services/huespedes.service';
import { CrearHuespedDto } from '../dto/crear_huesped.dto';

@Controller('huespedes')
export class HuespedesController {
  constructor(private readonly huespedesService: HuespedesService) {}

  @Post()
  crear(@Body() crearHuespedDto: CrearHuespedDto) {
    return this.huespedesService.crear(crearHuespedDto);
  }

  @Get()
  listar() {
    return this.huespedesService.listarTodos();
  }
}