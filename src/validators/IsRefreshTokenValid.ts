import {
  registerDecorator,
  ValidationArguments, ValidationOptions, ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { RefreshTokenRepository } from '../models/token';

@ValidatorConstraint({ async: true })
export class IsRefreshTokenValidConstraint implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);

    try {
      const refreshToken = await refreshTokenRepository.findOneByToken(value);

      return refreshToken.isValid();
    } catch (error) {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Invalid refresh token';
  }
}

export function IsRefreshTokenValid(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRefreshTokenValidConstraint
    });
  };
}
