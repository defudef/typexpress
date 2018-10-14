import {AccessToken} from '../models/token';
import {User} from '../models/user/User';
import {ForgotPasswordSchema} from '../schemas/request/auth/ForgotPasswordSchema';
import {PasswordSchema} from '../schemas/request/auth/PasswordSchema';
import {ActivationTokenSchema} from '../schemas/request/token/ActivationTokenSchema';
import {RefreshTokenSchema} from '../schemas/request/token/RefreshTokenSchema';
import {NewUserSchema} from '../schemas/request/user/NewUserSchema';
import {SignInUserSchema} from '../schemas/request/user/SignInUserSchema';
import {IMessageOkResponse} from '../schemas/response/auth/IMessageOkResponse';
import {IRefreshAccessTokenResponse} from '../schemas/response/auth/IRefreshAccessTokenResponse';

export interface IAuthController {
  signUp(body: NewUserSchema): Promise<User>;

  signIn(body: SignInUserSchema): Promise<IRefreshAccessTokenResponse>;

  activateAccount(body: ActivationTokenSchema): Promise<IRefreshAccessTokenResponse>;

  resendActivationToken(body: ForgotPasswordSchema): Promise<IMessageOkResponse>;

  refreshToken(body: RefreshTokenSchema): Promise<AccessToken>;

  forgotPassword(body: ForgotPasswordSchema): Promise<User>;

  setFirstPassword(token: string, body: PasswordSchema): Promise<User>;

  resetPassword(token: string, body: PasswordSchema);

  testCredentials(): IMessageOkResponse;
}
