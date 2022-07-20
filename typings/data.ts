export interface IDomainObject<T, U> {
  get: () => T;
  set: (_arg: Partial<U>) => void;
}

export interface IDataTransferObject<T, U> {
  get: () => T;
  set: (_arg: U) => void;
}
