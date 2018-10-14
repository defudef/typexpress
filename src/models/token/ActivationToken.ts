import { Entity } from 'typeorm';
import { AbstractToken } from './AbstractToken';

@Entity('activation_token')
export class ActivationToken extends AbstractToken {
}
