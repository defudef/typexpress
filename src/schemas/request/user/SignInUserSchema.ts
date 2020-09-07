import { IsEmail } from 'class-validator';

export class SignInUserSchema {
  @IsEmail()
  email: string;

  password: string;
}
