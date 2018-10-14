import { IsEmail, MinLength } from 'class-validator';
import { User } from '../../../models/user/User';
import { IsUnique } from '../../../validators/IsUnique';
import { StatusSchema } from '../StatusSchema';

export class NewUserSchema extends StatusSchema {
  @MinLength(3)
  firstName: string;

  @IsEmail()
  @IsUnique(User)
  email: string;
}
