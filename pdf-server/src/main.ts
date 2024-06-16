import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';

import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  const imagesDir = join(process.cwd(), 'uploads/images');
  if (!existsSync(imagesDir)) {
    mkdirSync(imagesDir);
  }


  app.use('/uploads', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use('/uploads', express.static(join(process.cwd(), 'uploads')));

  // 启用 CORS
  app.enableCors({
    origin: '*', // 允许的前端地址
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
