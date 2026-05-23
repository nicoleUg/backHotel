import { IsString, IsNotEmpty, IsEmail, IsOptional, MaxLength } from 'class-validator';

const MAX_LONGITUD_NOMBRE = 150; //refactor code smell para el 150 declarando que es un maximo 

export class CrearHuespedDto {
  @IsString()
  @IsNotEmpty({ message: 'El tipo de documento es obligatorio' })
  tipoDocumento: string;

  @IsString()
  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  numeroDocumento: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @MaxLength(MAX_LONGITUD_NOMBRE)
  nombre: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsOptional()
  correo?: string;
}