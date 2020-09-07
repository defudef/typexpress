import { User } from '../user/User';
import { AbstractToken } from './AbstractToken';

export interface IAbstractTokenRepository {
  generateToken(user: User): Promise<AbstractToken>;
  findOneByToken(token: string): Promise<AbstractToken>;
}
