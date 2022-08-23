import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail({ message: 'Email should be email.' })
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;

  @IsString({ message: 'Password should be string.' })
  @IsNotEmpty({ message: 'Password should not be empty.' })
  password: string;
}
