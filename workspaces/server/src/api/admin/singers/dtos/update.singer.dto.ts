import { PartialType } from '@nestjs/mapped-types';
import { Allow } from 'class-validator';

import { CreateSingerDto } from 'api/admin/singers/dtos';

export class UpdateSingerDto extends PartialType(CreateSingerDto) {
  @Allow()
  numberOfSongs: number;
}
