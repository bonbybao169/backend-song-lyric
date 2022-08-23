import { PartialType } from '@nestjs/mapped-types';
import { Allow } from 'class-validator';

import { CreateGenreDto } from './create.genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @Allow()
  numberOfSongs: number;
}
