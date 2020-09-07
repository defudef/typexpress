import { MinLength } from 'class-validator';
import { StatusSchema } from '../StatusSchema';

export class PasswordSchema extends StatusSchema {
  @MinLength(8)
  password: string;

  passwordRepeat: string;
}
