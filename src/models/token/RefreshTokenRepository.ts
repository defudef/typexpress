import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/User';
import { AbstractTokenHelper } from './AbstractTokenHelper';
import { IAbstractTokenRepository } from './IAbstractTokenRepository';
import { RefreshToken } from './RefreshToken';

const EXPIRATION_TIMESTAMP = Number(process.env.REFRESH_TOKEN_EXPIRATION || 1209600); // 2 weeks by default

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> implements IAbstractTokenRepository {
  findOneByToken(token: string): Promise<RefreshToken> {
    return AbstractTokenHelper.findOneByToken(this, token);
  }

  generateToken(user: User): Promise<RefreshToken> {
    return AbstractTokenHelper.generateToken(this, user, EXPIRATION_TIMESTAMP);
  }
}
