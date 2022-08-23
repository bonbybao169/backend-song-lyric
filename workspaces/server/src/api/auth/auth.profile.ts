import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, mapWith, forMember } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import type { Mapper } from '@automapper/core';

import { UserVM, UserWithTokenVM } from 'users/users.vm';

@Injectable()
export class AuthProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, UserVM, UserVM);
      createMap(
        mapper,
        UserWithTokenVM,
        UserWithTokenVM,
        forMember(
          (des) => {
            return des.data;
          },
          mapWith(UserVM, UserVM, (source) => {
            return source.data;
          }),
        ),
      );
    };
  }
}
