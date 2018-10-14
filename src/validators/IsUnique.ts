import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';
import { getRepository } from 'typeorm';
import { IsUniqueOptions } from './options/IsUniqueOptions';

@ValidatorConstraint({ async: true })
class IsUniqueConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Field is not unique';
  }

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const entityRepository = getRepository(validationArguments.constraints[0]);
    const criteria = {};

    criteria[validationArguments.property] = value;

    const result = await entityRepository.findOne(criteria);

    return (result === undefined);
  }
}

export function IsUnique(entity: any, validationOptions?: IsUniqueOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity],
      validator: IsUniqueConstraint
    });
  };
}
