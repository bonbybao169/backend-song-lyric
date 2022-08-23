import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString({ message: 'Genre name should be string.' })
  @IsNotEmpty({ message: 'Genre name should not be empty.' })
  name: string;
}
