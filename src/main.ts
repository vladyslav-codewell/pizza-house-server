import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.useGlobalPipes(new ValidationPipe({
    transform: true, // <-- ЦЕ НАЙВАЖЛИВІША ОПЦІЯ!
    whitelist: true, // Прибирає зайві поля, яких немає в DTO
    forbidNonWhitelisted: true // Відхиляє запит, якщо є зайві поля
  }));

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
