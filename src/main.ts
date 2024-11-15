import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger();

  const configService = app.get(ConfigService);

  const port: number = configService.getOrThrow<number>('app.http.port');

  const globalPrefix: string =
    configService.getOrThrow<string>('app.globalPrefix');

  const versioningPrefix: string = configService.getOrThrow<string>(
    'app.versioning.prefix',
  );

  const version: string = configService.getOrThrow<string>(
    'app.versioning.version',
  );

  //collection of smaller middleware functions that set security-related HTTP headers
  app.use(helmet());

  // ensure all endpoints are protected from receiving incorrect data
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new BadRequestException(errors),
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(port);

  logger.log(`==========================================================`);

  logger.log(
    `🚀 Http Server running on ${await app.getUrl()}${globalPrefix}/${versioningPrefix}${version}`,
    'NestApplication',
  );

  logger.log(`==========================================================`);
}
bootstrap();
