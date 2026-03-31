import { Controller, Post, Body } from '@nestjs/common';
import { ReservasService } from './reservas.service';
import { CancelarReservaDto } from './dto/cancelar_reserva.dto';

@Controller('reservas')
export class ReservasController {
  // Inyectamos el servicio
  constructor(private readonly reservasService: ReservasService) {}

  @Post('cancelar')
  cancelar(@Body() cancelarDto: CancelarReservaDto) {
    // El controlador delega el trabajo pesado a la capa de servicio
    return this.reservasService.cancelarConMora(cancelarDto.reservaId);
  }
}