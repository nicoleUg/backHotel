import { IsInt, IsPositive } from 'class-validator';

export class CancelarReservaDto {
  @IsInt({ message: 'El ID de la reserva debe ser un número entero' })
  @IsPositive({ message: 'El ID de la reserva debe ser positivo' })
  reservaId: number;
}