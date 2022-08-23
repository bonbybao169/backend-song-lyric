import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSingerDto {
  @IsString({ message: 'Singer name should be string.' })
  @IsNotEmpty({ message: 'Singer name should not be empty.' })
  name: string;

  @Allow()
  @Type(() => Date)
  dateOfBirth: Date;
}
