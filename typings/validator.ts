export type ValidationError = {
  field: string;
  message: string | null;
};

export type ValidationResult = {
  errors: ValidationError[];
};
