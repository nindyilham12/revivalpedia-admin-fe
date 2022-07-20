import { IUser } from '@/typings';

export const getUserPermissions = (role?: IUser['role']) => {
  switch (role) {
    case 'admin':
      return 4;
    case 'manager':
      return 3;
    case 'editor':
      return 2;
    case 'contributor':
      return 1;
    default:
      return 1;
  }
};
