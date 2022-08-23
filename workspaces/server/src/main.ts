import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { JwtAuthGuard, RolesGuard } from 'commons/guard';
import { ClassValidatorException } from 'commons/filters/exceptions/ClassValidatorExceptions/ClassValidatorException';
import { ResponseInterceptor } from 'commons/interceptors/ResponseInterceptor';
import { AppExceptionFilter } from 'commons/filters/AppException.filter';
import { PrismaService } from 'commons/prisma/prisma.service';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);

  app.enableCors();
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory(errors) {
        return new ClassValidatorException(errors);
      },
    }),
  );
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  app.useGlobalFilters(new AppExceptionFilter(app.get(HttpAdapterHost)));

  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  await app.listen(3_000);
}

bootstrap();
