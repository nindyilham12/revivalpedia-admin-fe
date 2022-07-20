import { ValidationResult } from '@/typings';

export abstract class BaseValidator<T> {
  abstract validate(_arg: T): ValidationResult | Promise<ValidationResult>;
}
