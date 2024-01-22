import { AppModule } from '@app/app.module';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LogService, MorganMiddleware } from '@log/log.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new LogService() });

  app.use(MorganMiddleware);

  const options = new DocumentBuilder()
    .setTitle('Stat Server API')
    .setDescription('API documentation for Stat Server')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
