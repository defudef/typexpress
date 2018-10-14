import { IndexController } from '../controllers/IndexController';
import { AuthController } from '../controllers/AuthController';

const Config = {
  siteName: process.env.SITE_NAME,
  siteUrl: process.env.SITE_URL,
  environment: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  frontendUrl: process.env.FRONTEND_URL,
  controllers: [
    IndexController,
    AuthController
  ],
  token: {
    accessToken: {
      expiration: process.env.ACCESS_TOKEN_EXPIRATION || 3600
    },
    activationToken: {
      expiration: process.env.ACTIVATION_TOKEN_EXPIRATION || 3600
    },
    refreshToken: {
      expiration: process.env.REFRESH_TOKEN_EXPIRATION || 1209600
    },
    resetPasswordToken: {
      expiration: process.env.RESET_PASSWORD_TOKEN || 3600
    }
  }
};

export default Config;
