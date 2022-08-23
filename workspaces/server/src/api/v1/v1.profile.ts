import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { createMap } from '@automapper/core';

import type { Mapper } from '@automapper/core';

import { LyricVM } from './lyrics/lyric.vm';

@Injectable()
export class V1Profile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, LyricVM, LyricVM);
    };
  }
}
