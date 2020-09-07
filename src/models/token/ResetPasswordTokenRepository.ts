import { EntityRepository, Repository } from 'typeorm';
import { User } from '../user/User';
import { AbstractTokenHelper } from './AbstractTokenHelper';
import { IAbstractTokenRepository } from './IAbstractTokenRepository';
import { ResetPasswordToken } from './ResetPasswordToken';

const EXPIRATION_TIMESTAMP = Number(process.env.RESET_PASSWORD_TOKEN_EXPIRATION || 3600);

@EntityRepository(ResetPasswordToken)
export class ResetPasswordTokenRepository extends Repository<ResetPasswordToken> implements IAbstractTokenRepository {
  findOneByToken(token: string): Promise<ResetPasswordToken> {
    return AbstractTokenHelper.findOneByToken(this, token);
  }

  generateToken(user: User): Promise<ResetPasswordToken> {
    return AbstractTokenHelper.generateToken(this, user, EXPIRATION_TIMESTAMP);
  }
}
