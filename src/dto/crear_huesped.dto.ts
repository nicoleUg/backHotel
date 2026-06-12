import { IsString, IsNotEmpty, IsEmail, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

const MAX_LONGITUD_NOMBRE = 150; //refactor code smell para el 150 declarando que es un maximo 

export class CrearHuespedDto {
  @ApiProperty({
    description: 'El tipo de documento de identidad del huésped (ej. DNI, Cédula, Pasaporte)',
    example: 'DNI',
  })
  @IsString()
  @IsNotEmpty({ message: 'El tipo de documento es obligatorio' })
  tipoDocumento: string;

  @ApiProperty({
    description: 'El número de documento de identidad del huésped',
    example: '12345678',
  })
  @IsString()
  @IsNotEmpty({ message: 'El número de documento es obligatorio' })
  numeroDocumento: string;

  @ApiProperty({
    description: 'El nombre completo del huésped',
    example: 'Juan Pérez',
    maxLength: MAX_LONGITUD_NOMBRE,
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre completo es obligatorio' })
  @MaxLength(MAX_LONGITUD_NOMBRE)
  nombre: string;

  @ApiPropertyOptional({
    description: 'El número telefónico de contacto del huésped',
    example: '+51987654321',
  })
  @IsString()
  @IsOptional()
  telefono?: string;

  @ApiPropertyOptional({
    description: 'La dirección de correo electrónico del huésped',
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  @IsOptional()
  correo?: string;
}