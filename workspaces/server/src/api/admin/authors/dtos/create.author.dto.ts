import { Allow, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthorDto {
  @IsString({ message: 'Author name should be string.' })
  @IsNotEmpty({ message: 'Author name should not be empty.' })
  name: string;

  @Allow()
  @Type(() => Date)
  dateOfBirth: Date;
}
