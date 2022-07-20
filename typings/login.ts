export enum LoginActionTypes {
  ERROR,
  FIELD,
  LOADING,
}

export type LoginFormField = {
  email: string;
  password: string;
};

export type LoginErrorState = {
  email: string | null;
  password: string | null;
  result: string | null;
};

export type LoginState = {
  errors: LoginErrorState;
  fields: LoginFormField;
  isLoading: boolean;
  success: boolean;
};

export type LoginAction =
  | {
      type: LoginActionTypes.FIELD;
      values: Partial<LoginFormField>;
    }
  | {
      type: LoginActionTypes.ERROR;
      values: Partial<LoginErrorState>;
    }
  | {
      type: LoginActionTypes.LOADING;
      value: boolean;
    };
