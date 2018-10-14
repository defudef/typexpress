import { IsEmail } from 'class-validator';
import { StatusSchema } from '../StatusSchema';

export class ForgotPasswordSchema extends StatusSchema {
  @IsEmail()
  email: string;
}
