import { IsString, IsNotEmpty, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class CrearHuespedDto {
  @IsString()
  @IsNotEmpty({ message: 'El tipo de documento es obligatorio' })
  tipoDocumento: string;

  @IsString()
  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  numeroDocumento: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @MaxLength(150)
  nombre: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsOptional()
  correo?: string;
}