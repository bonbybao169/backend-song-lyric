import { HttpAdapterHost, Reflector, RouterModule } from '@nestjs/core';
import { CacheModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { hash } from 'bcrypt';

import type { INestApplication } from '@nestjs/common';
import type { Routes } from '@nestjs/core';

import { JwtAuthGuard, RolesGuard } from 'commons/guard';
import { ClassValidatorException } from 'commons/filters/exceptions/ClassValidatorExceptions/ClassValidatorException';
import { ResponseInterceptor } from 'commons/interceptors/ResponseInterceptor';
import { AppExceptionFilter } from 'commons/filters/AppException.filter';
import { PrismaService } from 'commons/prisma/prisma.service';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { AdminModule, adminRoutes } from 'api/admin/admin.module';
import { V1Module, v1Routes } from 'api/v1/v1.module';
import { AuthModule } from 'api/auth/auth.module';
import { AppModule } from 'app.module';

export async function initializerApp(): Promise<INestApplication> {
  const routes: Routes = [adminRoutes, v1Routes];

  const module = await Test.createTestingModule({
    imports: [
      AppModule,
      V1Module,
      AuthModule,
      AdminModule,
      PrismaModule,
      CacheModule.register(),
      ConfigModule.forRoot({}),
      AutomapperModule.forRoot({
        strategyInitializer: classes(),
      }),
      RouterModule.register(routes),
    ],
  }).compile();

  const app: INestApplication = module.createNestApplication();

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

  await new PrismaService().user.create({
    data: {
      email: 'admin@gmail.com',
      password: await hash('admin', 10),
      role: 'admin',
      firstName: 'Tran',
      lastName: 'Bevis',
      numberOfUploads: 0,
    },
  });

  await app.init();

  return app;
}
