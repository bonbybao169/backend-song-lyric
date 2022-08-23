import { PartialType } from '@nestjs/mapped-types';
import { Allow } from 'class-validator';

import { CreateSongDto } from 'api/admin/songs/dtos/create.song.dto';

export class UpdateSongDto extends PartialType(CreateSongDto) {
  @Allow()
  view: number;
}
