import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors();

  const PUERTO = 3000;
  await app.listen(PUERTO);
  Logger.log(`Servidor corriendo en: http://localhost:${PUERTO}`);
  //refactor code smell para el 3000 declarando que es 
}
bootstrap();