import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global prefix (optional but clean)
  app.setGlobalPrefix('api');

  // ✅ Enable validation globally (very important for DTOs later)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown fields
      forbidNonWhitelisted: true,
      transform: true, // auto transform types
    }),
  );

  // ✅ Enable CORS (for frontend connection)
  app.enableCors();

  await app.listen(process.env.PORT || 3000);

  console.log(`🚀 Server running on http://localhost:3000/api`);
}

bootstrap();