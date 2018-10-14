import { Entity } from 'typeorm';
import { AbstractToken } from './AbstractToken';

@Entity('access_token')
export class AccessToken extends AbstractToken {
}
