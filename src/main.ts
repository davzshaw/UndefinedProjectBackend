// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: ["https://world-ker.vercel.app"], 
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, 
  });

  app.options('*', (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://world-ker.vercel.app"); // Permite solo tu dominio en Vercel
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200); 
  });

  await app.listen(3000);
  Logger.log('Application is running on: http://localhost:3000');
}

bootstrap();
