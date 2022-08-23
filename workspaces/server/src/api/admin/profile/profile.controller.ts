import { Controller, Request, Get } from '@nestjs/common';
import { Role } from '@prisma/client';

import type { User } from '@prisma/client';

import { UseMapperInterceptor } from 'commons/interceptors/MapperInterceptor';
import { Roles } from 'commons/decorator/roles.decorator';
import { UserVM } from 'users/users.vm';

@UseMapperInterceptor(UserVM, UserVM)
@Controller('profile')
export class ProfileController {
  @Roles(Role.admin)
  @Get()
  async getProfile(@Request() req): Promise<User> {
    return req.user;
  }
}
