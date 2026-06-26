import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnviornmentVariablesType } from './config/envValidation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('bootstrap');

  const configService = app.get(ConfigService<EnviornmentVariablesType>);

  const port = configService.get('PORT') || 3000;

  await app.listen(port);

  logger.log(`Application started running on PORT: ${port}`);
}
bootstrap();
