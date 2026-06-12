import { IsInt, IsDateString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CrearReservaDto {
  @ApiProperty({
    description: 'El ID del huésped titular de la reserva',
    example: 1,
  })
  @IsInt()
  titularId: number;

  @ApiProperty({
    description: 'El ID de la habitación a reservar',
    example: 2,
  })
  @IsInt()
  habitacionId: number;

  @ApiProperty({
    description: 'La fecha de inicio de la reserva (formato YYYY-MM-DD)',
    example: '2026-06-15',
  })
  @IsDateString({}, { message: 'La fecha de ingreso debe tener formato YYYY-MM-DD' })
  fechaReservaInicio: string;

  @ApiProperty({
    description: 'La fecha de salida de la reserva (formato YYYY-MM-DD)',
    example: '2026-06-20',
  })
  @IsDateString({}, { message: 'La fecha de salida debe tener formato YYYY-MM-DD' })
  fechaReservaSalida: string;

  @ApiProperty({
    description: 'La cantidad de personas que se hospedarán',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1, { message: 'Debe haber al menos 1 persona' })
  cantidadPersonas: number;
}