import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Activa las validaciones globales (crucial para los DTOs)
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Habilita CORS para que tu frontend en React pueda comunicarse sin bloqueos
  app.enableCors();

  await app.listen(3000);
  console.log(`Servidor corriendo en: http://localhost:3000`);
}
bootstrap();