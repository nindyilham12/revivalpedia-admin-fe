export type UserRole = 'admin' | 'manager' | 'editor' | 'contributor';

export interface IUserDTO {
  email: string;
  name: string;
  profile_photo_url?: string;
  role: UserRole;
  status?: string;
  uid: string;
  username: string;
}

export interface IUser {
  email: string;
  name: string;
  profilePhotoUrl?: string;
  role: UserRole;
  status?: string;
  uid: string;
  username: string;
  password: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type ProfileFormField = {
  email: string;
  name: string;
  profilePhotoUrl?: string;
  username: string;
  password: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type ProfileErrorState = {
  name: string | null;
  username: string | null;
  email: string | null;
  profilePhotoUrl?: string | null;
  password: string | null;
  oldPassword: string | null;
  newPassword: string | null;
  confirmNewPassword: string | null;
};
