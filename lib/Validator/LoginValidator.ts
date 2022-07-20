import Joi, { ValidationError as JoiValidationError } from 'joi';
import { LoginFormField, ValidationError, ValidationResult } from '@/typings';
import { EMPTY_EMAIL_ERROR, EMPTY_PASSWORD_ERROR, INVALID_EMAIL_ERROR } from '@/lib/Const';
import { BaseValidator } from '@/lib/Validator/BaseValidator';

export class LoginValidator extends BaseValidator<LoginFormField> {
  private _emailSchema = Joi.string().email({ tlds: false }).required().messages({
    'string.email': INVALID_EMAIL_ERROR,
    'string.empty': EMPTY_EMAIL_ERROR,
  });

  private _passwordSchema = Joi.string().required().messages({
    'string.empty': EMPTY_PASSWORD_ERROR,
  });

  private _deserializeError = (error: JoiValidationError): ValidationError[] => {
    const serializedErrors: ValidationError[] = error.details.map(({ path, message }) => ({
      field: String(path[0]),
      message,
    }));
    return serializedErrors;
  };

  validateField = async (field: keyof LoginFormField, value: string): Promise<ValidationResult> => {
    try {
      let validator: Joi.ObjectSchema;

      switch (field) {
        case 'email':
          validator = Joi.object({ email: this._emailSchema });
          break;
        case 'password':
          validator = Joi.object({ password: this._passwordSchema });
          break;
      }

      await validator.validateAsync({ [field]: value });

      return {
        errors: [
          {
            field,
            message: null,
          },
        ],
      };
    } catch (error) {
      return {
        errors: this._deserializeError(error as JoiValidationError),
      };
    }
  };

  async validate(form: LoginFormField): Promise<ValidationResult> {
    try {
      await Joi.object({
        email: this._emailSchema,
        password: this._passwordSchema,
      }).validateAsync(form, { abortEarly: false });

      return {
        errors: [],
      };
    } catch (error) {
      return {
        errors: this._deserializeError(error as JoiValidationError),
      };
    }
  }
}
