import create from 'zustand';
import createCountriesSlice, { CountriesSlice } from './countriesSlice';
import createUserSlice, { UserSlice } from './userSlice';

export type State = UserSlice & CountriesSlice;

const useStore = create<State>((set) => ({
  ...createUserSlice(set),
  ...createCountriesSlice(set),
}));

export default useStore;
