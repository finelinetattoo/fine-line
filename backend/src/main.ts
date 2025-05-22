import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = ['http://localhost:4200'];
  if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
  }
  const corsOptions: CorsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix('api');

  console.log('📦 DB_HOST:', process.env.DB_HOST);
  console.log('📦 DB_PORT:', process.env.DB_PORT);
  console.log('📦 DB_USER:', process.env.DB_USER);
  console.log('📦 DB_PASSWORD:', process.env.DB_PASSWORD ? '***' : 'NOT SET');
  console.log('📦 DB_NAME:', process.env.DB_NAME);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Backend escuchando en http://localhost:${port}/api`);
}

bootstrap();
