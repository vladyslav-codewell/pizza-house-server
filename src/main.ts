import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { ValidationPipe, VersioningType } from '@nestjs/common';
=======
import { ValidationPipe } from '@nestjs/common';
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  // Global API prefix
  app.setGlobalPrefix('api');

  // CORS — adjust origins for production
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global validation pipe — strips unknown fields, auto-transforms types
=======
  // --- Swagger Configuration ---
  const config = new DocumentBuilder()
    .setTitle('Pizza House API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name must match the one in @ApiBearerAuth()
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // --- Global Validation ---
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

<<<<<<< HEAD
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Pizza House API')
    .setDescription(
      `## Pizza House REST API\n\n` +
        `### Authentication\n` +
        `Most write endpoints require a Bearer JWT token.\n` +
        `1. Register via \`POST /api/users\`\n` +
        `2. Login via \`POST /api/auth/login\` — get \`access_token\`\n` +
        `3. Click **Authorize** and paste the token\n\n` +
        `### Public endpoints\n` +
        `All \`GET\` endpoints for products, categories and modifiers are public.`,
    )
    .setVersion('1.0')
    .addServer('/', 'Default')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Paste your JWT access_token here',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // keeps token after page refresh
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = process.env.PORT ?? 5000;
  await app.listen(port);
  console.log(`🚀 Server: http://localhost:${port}/api`);
  console.log(`📖 Swagger: http://localhost:${port}/docs`);
=======
  const port = process.env.PORT ?? 5000;
  await app.listen(port);
  console.log(`🚀 Server running on: http://localhost:${port}`);
  console.log(`📖 Documentation: http://localhost:${port}/docs`);
>>>>>>> f7754b0be294babc5cd73293a96785f825d12836
}
bootstrap();
