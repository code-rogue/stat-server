import { AppModule } from '@app/app.module';
import { ApplicationConfig } from '@config/config.dto';
import { LogService, MorganMiddleware } from '@log/log.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new LogService() });

  app.use(MorganMiddleware);

  const options = new DocumentBuilder()
    .setTitle('Stat Server API')
    .setDescription('API documentation for Stat Server')
    .setVersion('1.0')
    .build();

  const configService = app.get(ConfigService);
  const appConfig = configService.get<ApplicationConfig>('app')
  
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(appConfig.swagger, app, document);
  
  await app.listen(appConfig.port);
}
bootstrap();
