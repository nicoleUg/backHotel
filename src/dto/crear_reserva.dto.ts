import { IsInt, IsDateString, Min } from 'class-validator';

export class CrearReservaDto {
  @IsInt()
  titularId: number;

  @IsInt()
  habitacionId: number;

  @IsDateString({}, { message: 'La fecha de ingreso debe tener formato YYYY-MM-DD' })
  fechaReservaInicio: string;

  @IsDateString({}, { message: 'La fecha de salida debe tener formato YYYY-MM-DD' })
  fechaReservaSalida: string;

  @IsInt()
  @Min(1, { message: 'Debe haber al menos 1 persona' })
  cantidadPersonas: number;
}