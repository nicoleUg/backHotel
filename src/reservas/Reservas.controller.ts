import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CancelarReservaDto } from './dto/cancelar_reserva.dto';
import { CrearReservaDto } from './dto/crear_reserva.dto';
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
    // Convertimos el id de string a número con el signo '+'
    return this.reservasService.registrarCheckIn(+id);
  }
  @Post('cancelar')
  cancelar(@Body() cancelarDto: CancelarReservaDto) {
    return this.reservasService.cancelarConMora(cancelarDto.reservaId);
  }
}