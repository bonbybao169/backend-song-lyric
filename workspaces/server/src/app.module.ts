import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CacheModule, Module } from '@nestjs/common';
import { RouterModule, Routes } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AdminModule, adminRoutes } from 'api/admin/admin.module';
import { V1Module, v1Routes } from 'api/v1/v1.module';
import { AuthModule } from 'api/auth/auth.module';
import { PrismaModule } from 'commons/prisma/prisma.module';
import { AppController } from 'app.controller';

const routes: Routes = [adminRoutes, v1Routes];

@Module({
  imports: [
    V1Module,
    AuthModule,
    AdminModule,
    PrismaModule,
    CacheModule.register(),
    ConfigModule.forRoot({}),
    RouterModule.register(routes),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
