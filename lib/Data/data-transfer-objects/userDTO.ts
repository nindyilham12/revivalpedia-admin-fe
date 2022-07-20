import { IDataTransferObject, IUser, IUserDTO } from '@/typings';

export class UserDTO implements IDataTransferObject<IUserDTO, IUser> {
  private _userDTO: IUserDTO;

  private constructor(_userDTO: IUserDTO) {
    this._userDTO = _userDTO;
  }

  get = () => this._userDTO;

  set = (payload: Partial<IUserDTO>) => {
    this._userDTO = {
      ...this._userDTO,
      ...payload,
    };
  };

  static fromDO = (userDO: IUser) => {
    const userDTO: IUserDTO = {
      email: userDO.email,
      name: userDO.name,
      profile_photo_url: userDO.profilePhotoUrl,
      role: userDO.role,
      status: userDO.status,
      uid: userDO.uid,
      username: userDO.username,
      password: userDO.password,
      oldPassword: userDO.oldPassword,
      newPassword: userDO.newPassword,
      confirmNewPassword: userDO.confirmNewPassword,
    };

    return new UserDTO(userDTO);
  };
}
