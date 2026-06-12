import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservasService } from '../services/reservas.service';
import { CancelarReservaDto } from '../dto/cancelar_reserva.dto';
import { CrearReservaDto } from '../dto/crear_reserva.dto';
@ApiTags('reservas')
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Get()
  obtenerTodas() {
    return this.reservasService.listarReservas();
  }
  @Post()
  crearReserva(@Body() crearDto: CrearReservaDto) {
    return this.reservasService.crearReserva(crearDto);
  }
  @Patch(':id/checkin')
  hacerCheckIn(@Param('id') id: string) {
    return this.reservasService.registrarCheckIn(+id);
  }
  @Post('cancelar')
  cancelar(@Body() cancelarDto: CancelarReservaDto) {
    return this.reservasService.cancelarConMora(cancelarDto.reservaId);
  }
}