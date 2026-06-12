import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors();

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Hotel Management API')
    .setDescription('API para la gestión de reservas de hotel')
    .setVersion('1.0')
    .addTag('huespedes', 'Gestión de huéspedes del hotel')
    .addTag('reservas', 'Gestión de reservas de habitaciones')
    .addTag('contacto-servicio', 'Directorio de servicios de contacto del hotel')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PUERTO = 3000;
  await app.listen(PUERTO);
  Logger.log(`Servidor corriendo en: http://localhost:${PUERTO}`);
  Logger.log(`Documentación de Swagger disponible en: http://localhost:${PUERTO}/api`);
  //refactor code smell para el 3000 declarando que es 
}
bootstrap();