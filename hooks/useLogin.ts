import { useCallback, useReducer } from 'react';
import { useAuth } from './useAuth';
import {
  LoginAction,
  LoginActionTypes,
  LoginErrorState,
  LoginFormField,
  LoginState,
  ValidationResult,
} from '@/typings';
import { LoginValidator } from '@/lib/Validator';

const validator = new LoginValidator();

const initialState: LoginState = {
  errors: {
    email: null,
    password: null,
    result: null,
  },
  fields: {
    email: '',
    password: '',
  },
  isLoading: false,
  success: false,
};

const reducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case LoginActionTypes.ERROR:
      return { ...state, errors: { ...state.errors, ...action.values } };
    case LoginActionTypes.FIELD:
      return {
        ...state,
        fields: { ...state.fields, ...action.values },
      };
    case LoginActionTypes.LOADING:
      return { ...state, isLoading: action.value };
    default:
      return state;
  }
};

const parseValidationErrors = (errors: ValidationResult['errors']): Partial<LoginErrorState> => {
  const parsedErrorState: Partial<LoginErrorState> = errors.reduce((errors, current) => {
    const field = current.field as keyof LoginErrorState;
    errors[field] = current.message;

    return errors;
  }, {} as Partial<LoginErrorState>);

  return parsedErrorState;
};

export const useLogin = (
  onFail?: (error: Partial<LoginErrorState>) => void,
  onSuccess?: () => void,
) => {
  const { signIn } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);

  const update = useCallback(async (field: keyof LoginFormField, value: string) => {
    dispatch({ type: LoginActionTypes.FIELD, values: { [field]: value } });

    const validationResults = await validator.validateField(field, value);

    dispatch({
      type: LoginActionTypes.ERROR,
      values: parseValidationErrors(validationResults.errors),
    });
  }, []);

  const submit = useCallback(async () => {
    dispatch({ type: LoginActionTypes.ERROR, values: initialState.errors });

    const validationResults = await validator.validate(state.fields);

    if (validationResults.errors.length > 0) {
      const fieldErrors = parseValidationErrors(validationResults.errors);
      dispatch({ type: LoginActionTypes.ERROR, values: fieldErrors });
      onFail?.(fieldErrors);
      return;
    }

    dispatch({ type: LoginActionTypes.LOADING, value: true });

    const { error, success } = await signIn(state.fields.email, state.fields.password);

    if (success) {
      onSuccess?.();
    } else {
      const newErrorState: Partial<LoginErrorState> = {
        result: error,
        email: null,
        password: null,
      };
      dispatch({
        type: LoginActionTypes.ERROR,
        values: newErrorState,
      });
      onFail?.(newErrorState);
    }
    dispatch({ type: LoginActionTypes.LOADING, value: false });
  }, [onFail, onSuccess, signIn, state.fields]);

  return { state, update, submit };
};
