import { Action } from 'routing-controllers';
import { getCustomRepository } from 'typeorm';
import { AccessTokenRepository } from '../models/token';
import { User } from '../models/user/User';
import { UserRepository } from '../models/user/UserRepository';

const getTokenFromHeader = (header: string): string | undefined => {
  if (!header) {
    return undefined;
  }

  if (header.substr(0, 7) !== 'Bearer ') {
    return undefined;
  }

  return header.substr(7);
};

const authorizationCheckerHandler = async (action: Action, roles: string[]): Promise<boolean> => {
  const { authorization } = action.request.headers;

  const reqAccessToken = getTokenFromHeader(authorization);

  if (!reqAccessToken) {
    return false;
  }

  try {
    const accessTokenRepository = getCustomRepository(AccessTokenRepository);

    const accessToken = await accessTokenRepository.findOneByToken(reqAccessToken);

    return accessToken.isValid();
  } catch (err) {
    return false;
  }
};

const currentUserCheckerHandler = async (action: Action): Promise<User> => {
  const { authorization } = action.request.headers;
  const [userRepository, accessTokenRepository] = [
    getCustomRepository(UserRepository),
    getCustomRepository(AccessTokenRepository)
  ];

  const reqAccessToken = getTokenFromHeader(authorization);

  if (!reqAccessToken) {
    return undefined;
  }

  const at = await accessTokenRepository.findOneByToken(reqAccessToken);

  return userRepository.findOne(at.userId);
};

export {
  getTokenFromHeader,
  authorizationCheckerHandler,
  currentUserCheckerHandler
};
