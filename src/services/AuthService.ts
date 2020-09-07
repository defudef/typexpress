import { getCustomRepository } from 'typeorm';
import {
  AccessToken,
  AccessTokenRepository,
  ActivationTokenRepository,
  RefreshTokenRepository,
  ResetPasswordTokenRepository
} from '../models/token';

import UserStatus from '../models/enums/UserStatus';
import { User } from '../models/user/User';
import { UserRepository } from '../models/user/UserRepository';
import { IRefreshAccessTokenResponse } from '../schemas/response/auth/IRefreshAccessTokenResponse';
import { IAuthService } from './IAuthService';
import { getTokenFromHeader } from './MiddlewareHandlerService';
import { sendActivationEmail, sendResetPasswordEmail } from './SendGridService';

export class AuthService implements IAuthService {
  private userRepository: UserRepository;
  private accessTokenRepository: AccessTokenRepository;
  private activationTokenRepository: ActivationTokenRepository;
  private refreshTokenRepository: RefreshTokenRepository;
  private resetPasswordTokenRepository: ResetPasswordTokenRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
    this.accessTokenRepository = getCustomRepository(AccessTokenRepository);
    this.activationTokenRepository = getCustomRepository(ActivationTokenRepository);
    this.refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
    this.resetPasswordTokenRepository = getCustomRepository(ResetPasswordTokenRepository);
  }

  async activateAccount(activationToken: string): Promise<IRefreshAccessTokenResponse> {
    const activationTokenEntity = await this.activationTokenRepository.findOneByToken(activationToken);
    const user = await this.userRepository.findOneOrFail(activationTokenEntity.userId);

    user.setStatus(UserStatus.INACTIVE);

    await this.userRepository.save(user);

    const [accessTokenEntity, refreshTokenEntity] = await Promise.all([
      this.accessTokenRepository.generateToken(user),
      this.refreshTokenRepository.generateToken(user)
    ]);

    return {
      accessToken: accessTokenEntity.token,
      refreshToken: refreshTokenEntity.token
    };
  }

  async createNewUser(firstName: string, email: string): Promise<User> {
    const createdUser = await this.userRepository.createNewUser(firstName, email);
    const activationTokenEntity = await this.activationTokenRepository.generateToken(createdUser);

    await sendActivationEmail(createdUser, activationTokenEntity);

    return createdUser;
  }

  async performResetPassword(resetPasswordToken: string, newPassword: string): Promise<User | undefined> {
    const resetPasswordTokenEntity = await this.resetPasswordTokenRepository.findOneByToken(getTokenFromHeader(resetPasswordToken));

    if (!resetPasswordTokenEntity.isValid()) {
      return undefined;
    }

    const user = await this.userRepository.findOne(resetPasswordTokenEntity.userId);

    await this.userRepository.changePassword(user, newPassword);
    await this.resetPasswordTokenRepository.remove(resetPasswordTokenEntity);

    return user;
  }

  async refreshToken(refreshToken): Promise<AccessToken | undefined> {
    const refreshTokenEntity = await this.refreshTokenRepository.findOneByToken(refreshToken);

    if (!refreshTokenEntity.isValid()) {
      return undefined;
    }

    return this.accessTokenRepository.generateTokenByUserId(refreshToken.userId);
  }

  async requestResetPassword(email: string): Promise<User> {
    const user = await this.userRepository.findOneByEmail(email);
    const resetPasswordToken = await this.resetPasswordTokenRepository.generateToken(user);

    await sendResetPasswordEmail(user, resetPasswordToken);

    return user;
  }

  async resendActivationLink(email: string): Promise<boolean> {
    const createdUser = await this.userRepository.findOneByEmail(email);

    if (!createdUser) {
      return false;
    }

    const activationTokenEntity = await this.activationTokenRepository.generateToken(createdUser);

    await sendActivationEmail(createdUser, activationTokenEntity);

    return true;
  }

  async setFirstPassword(activationToken: string, password: string): Promise<User | undefined> {
    const activationTokenEntity = await this.activationTokenRepository.findOneByToken(getTokenFromHeader(activationToken));

    if (!activationTokenEntity.isValid()) {
      return undefined;
    }

    const user = await this.userRepository.findOne(activationTokenEntity.userId);

    return this.userRepository.changePassword(user, password);
  }

  async signInUser(email: string, password: string): Promise<IRefreshAccessTokenResponse> {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user.validatePassword(password)) {
      return undefined;
    }

    const [accessTokenEntity, refreshTokenEntity] = await Promise.all([
      this.accessTokenRepository.generateToken(user),
      this.refreshTokenRepository.generateToken(user)
    ]);

    return {
      accessToken: accessTokenEntity.token,
      refreshToken: refreshTokenEntity.token
    };
  }
}
