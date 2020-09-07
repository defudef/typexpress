import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/User';
import { AbstractTokenHelper } from './AbstractTokenHelper';
import { AccessToken } from './AccessToken';
import { IAbstractTokenRepository } from './IAbstractTokenRepository';
import { RefreshToken } from './RefreshToken';

const EXPIRATION_TIMESTAMP = Number(process.env.ACCESS_TOKEN_EXPIRATION || 3600);

@EntityRepository(AccessToken)
export class AccessTokenRepository extends Repository<AccessToken> implements IAbstractTokenRepository {
  findOneByToken(token: string): Promise<AccessToken> {
    return AbstractTokenHelper.findOneByToken(this, token);
  }

  generateToken(user: User): Promise<AccessToken> {
    return AbstractTokenHelper.generateToken(this, user, EXPIRATION_TIMESTAMP);
  }

  generateTokenByUserId(userId: string): Promise<RefreshToken> {
    return AbstractTokenHelper.generateTokenByUserId(this, userId, EXPIRATION_TIMESTAMP);
  }
}
