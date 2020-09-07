import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint()
class IgnorePropertyConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `"${validationArguments.property}" is not valid property`;
  }

  validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    delete validationArguments.object[validationArguments.property];

    return true;
  }
}

export function IgnoreProperty(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IgnorePropertyConstraint
    });
  };
}
