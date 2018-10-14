import * as moment from 'moment';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';
import { User } from '../user/User';
import { AbstractToken } from './AbstractToken';

export class AbstractTokenHelper {
  static async generateToken(abstractToken: Repository<AbstractToken>, user: User, expirationTimestamp: number): Promise<AbstractToken> {
    const createdToken = abstractToken.create({
      userId: user.id,
      token: uuidv4(),
      expiresAt: moment().add(expirationTimestamp, 's').toDate()
    });

    return abstractToken.save(createdToken);
  }

  static async generateTokenByUserId(abstractToken: Repository<AbstractToken>, userId: string, expirationTimestamp: number): Promise<AbstractToken> {
    const createdToken = abstractToken.create({
      userId,
      token: uuidv4(),
      expiresAt: moment().add(expirationTimestamp, 's').toDate()
    });

    return abstractToken.save(createdToken);
  }

  static findOneByToken(abstractToken: Repository<AbstractToken>, token: string): Promise<AbstractToken> {
    return abstractToken.findOneOrFail({ token });
  }
}
