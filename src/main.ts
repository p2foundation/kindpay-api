import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config';
import { Logger, ValidationError, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { FallbackExceptionFilter } from './filters/fallback.filter';
import { HttpExceptionFilter } from './filters/http.filter';
import { ValidationException } from './filters/validation.exception';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalFilters(
    new FallbackExceptionFilter(),
    new HttpExceptionFilter(),
  );
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          (error) => `${error.property} has wrong value ${error.value},
                ${Object.values(error.constraints).join(', ')} `,
        );
        return new ValidationException(messages);
      },
    }),
  );

  const port = process.env.PORT || SERVER_PORT;
  await app.listen(port);
  logger.debug(`Kindpay-env listening on port ${port}`);
}
bootstrap();
