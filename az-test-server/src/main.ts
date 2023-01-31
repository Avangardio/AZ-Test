import { NestFactory } from '@nestjs/core';
import { AppModule } from './App/app.module';
import * as cookieParser from 'cookie-parser';
import {join} from "path";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({origin: `http://localhost:3000`, credentials: true});
  await app.listen(2222);
}
bootstrap();
