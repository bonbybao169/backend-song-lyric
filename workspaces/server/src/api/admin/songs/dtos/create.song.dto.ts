import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString({ message: 'Song name should be string.' })
  @IsNotEmpty({ message: 'Song name should not be empty.' })
  name: string;

  @IsNumber(undefined, { message: 'Length should be number.' })
  length: number;

  @IsString({ message: 'URL should be string.' })
  url: string;

  @IsArray({ message: 'Singers must be array of number' })
  singers: number[];

  @IsArray({ message: 'Authors must be array of number' })
  authors: number[];

  @IsArray({ message: 'Genres must be array of number' })
  genres: number[];
}
