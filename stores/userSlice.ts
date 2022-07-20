import { IUser } from '@/typings';
import { SetState } from 'zustand';
import { State } from './';

export interface UserSlice {
  user: IUser | null;
  /* eslint-disable-next-line */
  setUser: (user: IUser | null) => void;
}

const createUserSlice = (set: SetState<State>) => ({
  user: null,
  setUser: (user: IUser | null) => set({ user }),
});

export default createUserSlice;
