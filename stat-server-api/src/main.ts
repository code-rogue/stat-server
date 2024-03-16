//import * as fs from 'fs';

import { AppModule } from '@app/app.module';
import { ApplicationConfig } from '@config/config.dto';
import { LogService, MorganMiddleware } from '@log/log.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const httpsOptions = {
    //key: fs.readFileSync('./certs/server.key'),
    //cert: fs.readFileSync('./certs/server.cert'),
    logger: new LogService(),
  };

  const app = await NestFactory.create(AppModule, httpsOptions);
  
  // Enable CORS globally
  app.enableCors({
      origin: '*', // Allow requests from any origin (change as needed)
      methods: ['GET', 'POST'], // Allow specified HTTP methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
      credentials: true, // Allow sending cookies in cross-origin requests
  }); 

  app.use(MorganMiddleware);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<ApplicationConfig>('app')
  
  const options = new DocumentBuilder()
    .setTitle('Stat Server API')
    .setDescription('API documentation for Stat Server')
    .setVersion('1.0')
    .build();

  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(appConfig.swagger, app, document);
  
  await app.listen(appConfig.port);
}
bootstrap();
