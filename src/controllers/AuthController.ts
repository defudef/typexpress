import {
  Authorized,
  BadRequestError,
  Body, Get, HeaderParam,
  JsonController,
  Post,
  Put
} from 'routing-controllers';
import { AccessToken } from '../models/token';
import { User } from '../models/user/User';
import { ForgotPasswordSchema } from '../schemas/request/auth/ForgotPasswordSchema';
import { PasswordSchema } from '../schemas/request/auth/PasswordSchema';
import { ActivationTokenSchema } from '../schemas/request/token/ActivationTokenSchema';
import { RefreshTokenSchema } from '../schemas/request/token/RefreshTokenSchema';
import { NewUserSchema } from '../schemas/request/user/NewUserSchema';
import { SignInUserSchema } from '../schemas/request/user/SignInUserSchema';
import { IRefreshAccessTokenResponse } from '../schemas/response/auth/IRefreshAccessTokenResponse';
import { AuthService } from '../services/AuthService';
import { IAuthService } from '../services/IAuthService';
import { IAuthController } from './IAuthController';

@JsonController('/auth')
export class AuthController implements IAuthController {
  private authService: IAuthService;

  constructor() {
    this.authService = new AuthService();
  }

  @Post('/sign-up')
  async signUp(@Body() body: NewUserSchema): Promise<User> {
    return this.authService.createNewUser(body.firstName, body.email);
  }

  @Post('/sign-in')
  async signIn(@Body() body: SignInUserSchema): Promise<IRefreshAccessTokenResponse> {
    return this.authService.signInUser(body.email, body.password);
  }

  @Post('/activate')
  async activateAccount(@Body() body: ActivationTokenSchema): Promise<IRefreshAccessTokenResponse> {
    return this.authService.activateAccount(body.token);
  }

  @Post('/resend-activation')
  async resendActivationToken(@Body() body: ForgotPasswordSchema) {
    await this.authService.resendActivationLink(body.email);

    return { message: 'ok' };
  }

  @Post('/refresh-token')
  async refreshToken(@Body() body: RefreshTokenSchema): Promise<AccessToken> {
    return this.authService.refreshToken(body.token);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordSchema): Promise<User> {
    return this.authService.requestResetPassword(body.email);
  }

  @Put('/set-password')
  async setFirstPassword(
    @HeaderParam('Authorization') token: string,
    @Body() body: PasswordSchema
  ): Promise<User> {
    if (body.password !== body.passwordRepeat) {
      throw new BadRequestError("Passwords don't match");
    }

    return this.authService.setFirstPassword(token, body.password);
  }

  @Put('/reset-password')
  async resetPassword(@HeaderParam('Authorization') token: string, @Body() body: PasswordSchema): Promise<User> {
    if (body.password !== body.passwordRepeat) {
      throw new BadRequestError("Passwords don't match");
    }

    return this.authService.performResetPassword(token, body.password);
  }

  @Get('/test')
  @Authorized()
  testCredentials() {
    return { message: 'ok' };
  }
}
