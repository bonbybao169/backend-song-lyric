import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLyricDto {
  @IsNumber(undefined, { message: 'Song ID should be number.' })
  songId: number;

  @IsString({ message: 'Language code should be string.' })
  @IsNotEmpty({ message: 'Language code should not be empty.' })
  languageCode: string;

  @IsString({ message: 'Content should be string.' })
  content: string;

  @IsNumber(undefined, { message: 'Translator ID should be number.' })
  translatorId: number;

  @IsBoolean({ message: 'Default should be true or false.' })
  default: boolean;
}
