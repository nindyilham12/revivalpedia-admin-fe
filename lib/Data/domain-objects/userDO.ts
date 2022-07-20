import { IDomainObject, IUser, IUserDTO } from '@/typings';

export class UserDO implements IDomainObject<IUser, IUserDTO> {
  private _user: IUser = {} as IUser;

  private constructor(_user: IUser) {
    this._user = _user;
  }

  get = () => this._user;

  set = (payload: Partial<IUser>) => {
    this._user = {
      ...this._user,
      ...payload,
    };
  };

  static fromDTO = (userDTO: IUserDTO) => {
    const user: IUser = {
      email: userDTO.email,
      name: userDTO.name,
      profilePhotoUrl: userDTO.profile_photo_url,
      role: userDTO.role,
      status: userDTO.status,
      uid: userDTO.uid,
      username: userDTO.username,
      password: userDTO.password,
      oldPassword: userDTO.oldPassword,
      newPassword: userDTO.newPassword,
      confirmNewPassword: userDTO.confirmNewPassword,
    };

    return new UserDO(user);
  };
}
