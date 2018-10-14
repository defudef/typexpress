import { Entity } from 'typeorm';
import { AbstractToken } from './AbstractToken';

@Entity('refresh_token')
export class RefreshToken extends AbstractToken {
}
