import { Entity } from 'typeorm';
import { AbstractToken } from './AbstractToken';

@Entity('reset_password_token')
export class ResetPasswordToken extends AbstractToken {
}
