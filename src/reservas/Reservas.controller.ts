import { Controller, Post, Body } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CancelarReservaDto } from './dto/cancelar_reserva.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post('cancelar')
  cancelar(@Body() cancelarDto: CancelarReservaDto) {
    return this.reservasService.cancelarConMora(cancelarDto.reservaId);
  }
}