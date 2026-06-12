import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HuespedesService } from '../services/huespedes.service';
import { CrearHuespedDto } from '../dto/crear_huesped.dto';

@ApiTags('huespedes')
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