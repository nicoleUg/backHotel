import { IsInt, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CancelarReservaDto {
  @ApiProperty({
    description: 'El ID de la reserva a cancelar',
    example: 1,
  })
  @IsInt({ message: 'El ID de la reserva debe ser un número entero' })
  @IsPositive({ message: 'El ID de la reserva debe ser positivo' })
  reservaId: number;
}