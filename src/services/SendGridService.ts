import * as MailService from '@sendgrid/mail';
import { User } from '../models/user/User';

import { ActivationToken, ResetPasswordToken } from '../models/token';
import * as activateAccount from '../templates/activateAccount';
import * as resetPassword from '../templates/resetPassword';

MailService.setApiKey(process.env.SENDGRID_API_KEY);

const EMAIL_FROM = `no-reply@${process.env.SITE_URL}`;

const getActivationUrl = (activationToken: ActivationToken) => (
  `${process.env.FRONTEND_URL}/#/verify/${activationToken.token}`
);

const getResetPasswordUrl = (resetPasswordToken: ResetPasswordToken) => (
  `${process.env.FRONTEND_URL}/#/reset-password/${resetPasswordToken.token}`
);

const sendActivationEmail = (user: User, activationToken: ActivationToken) => {
  const [firstName, activationUrl] = [ user.firstName, getActivationUrl(activationToken) ];

  return MailService.send({
    to: user.email,
    from: EMAIL_FROM,
    subject: `${firstName}, please activate your account on ${process.env.SITE_NAME}`,
    html: activateAccount.getHtml(firstName, activationUrl)
  });
};

const sendResetPasswordEmail = (user: User, resetPasswordToken: ResetPasswordToken) => {
  const [firstName, resetPasswordUrl] = [ user.firstName, getResetPasswordUrl(resetPasswordToken) ];

  return MailService.send({
    to: user.email,
    from: EMAIL_FROM,
    subject: `${firstName}, here is your token to reset password on ${process.env.SITE_NAME}`,
    html: resetPassword.getHtml(firstName, resetPasswordUrl)
  });
};

export {
  sendActivationEmail,
  sendResetPasswordEmail
};
