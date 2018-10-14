import {
  registerDecorator,
  ValidationArguments, ValidationOptions, ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { getCustomRepository } from 'typeorm';
import { ActivationTokenRepository } from '../models/token';

@ValidatorConstraint({ async: true })
export class IsActivationTokenValidConstraint implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const activationTokenRepository = getCustomRepository(ActivationTokenRepository);

    try {
      const activationToken = await activationTokenRepository.findOneByToken(value);

      return activationToken.isValid();
    } catch (error) {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Invalid activation token';
  }
}

export function IsActivationTokenValid(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsActivationTokenValidConstraint
    });
  };
}
