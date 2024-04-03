import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsOldEnough(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isOldEnough',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [day, month, year] = value.split('/').map(Number);
          const birthday = new Date(year, month - 1, day);
          console.log(birthday);
          const ageDiffMilliseconds = Date.now() - birthday.getTime();
          const ageDate = new Date(ageDiffMilliseconds); // Epoch
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);
          return age >= 18;
        },
      },
    });
  };
}
