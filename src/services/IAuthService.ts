import { AccessToken } from '../models/token';
import { User } from '../models/user/User';
import { IRefreshAccessTokenResponse } from '../schemas/response/auth/IRefreshAccessTokenResponse';

export interface IAuthService {
  createNewUser(firstName: string, email: string): Promise<User>;

  activateAccount(activationToken: string): Promise<IRefreshAccessTokenResponse>;

  setFirstPassword(activationToken: string, password: string): Promise<User | undefined>;

  requestResetPassword(email: string): Promise<User>;

  performResetPassword(resetPasswordToken: string, newPassword: string): Promise<User | undefined>;

  signInUser(email: string, password: string): Promise<IRefreshAccessTokenResponse>;

  resendActivationLink(email: string): Promise<boolean>;

  refreshToken(refreshToken): Promise<AccessToken | undefined>;
}
