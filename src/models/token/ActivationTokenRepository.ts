import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/User';
import { ActivationToken } from './ActivationToken';

import { AbstractTokenHelper } from './AbstractTokenHelper';
import { IAbstractTokenRepository } from './IAbstractTokenRepository';

const EXPIRATION_TIMESTAMP = Number(process.env.ACTIVATION_TOKEN_EXPIRATION || 3600);

@EntityRepository(ActivationToken)
export class ActivationTokenRepository extends Repository<ActivationToken> implements IAbstractTokenRepository {
  findOneByToken(token: string): Promise<ActivationToken> {
    return AbstractTokenHelper.findOneByToken(this, token);
  }

  generateToken(user: User): Promise<ActivationToken> {
    return AbstractTokenHelper.generateToken(this, user, EXPIRATION_TIMESTAMP);
  }
}
