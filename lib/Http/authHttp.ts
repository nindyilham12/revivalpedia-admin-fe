import { IUser } from '@/typings';
import { AxiosError } from 'axios';
import { INVALID_CREDENTIALS_ERROR, SERVER_ERROR } from '../Const';
import { UserDO } from '../Data/domain-objects';
import { axiosClient } from './axiosClient';

type LoginResult = {
  error?: string;
  success: boolean;
  user: IUser | null;
};

export const getUserInfo = async (): Promise<{ success: boolean; user: IUser | null }> => {
  try {
    const { data } = await axiosClient.get('/auth/me');

    if (!data.email || !data.username) {
      throw new Error('Invalid token');
    }

    const userDO = UserDO.fromDTO(data);

    return { success: true, user: userDO.get() };
  } catch (error) {
    return { success: false, user: null };
  }
};

export const signIn = async (email: string, password: string): Promise<LoginResult> => {
  try {
    const { data } = await axiosClient.post('/auth/login', {
      email,
      password,
    });

    const { token_type: tokenType, access_token: accessToken, refresh_token: refreshToken } = data;

    localStorage.setItem('access_token', `${tokenType} ${accessToken}`);
    localStorage.setItem('refresh_token', refreshToken);

    axiosClient.defaults.headers.common['Authorization'] = `${tokenType} ${accessToken}`;

    return getUserInfo();
  } catch (_error) {
    const error = _error as AxiosError;

    const result: LoginResult = {
      success: false,
      user: null,
    };

    const statusCode = error.response?.status;

    switch (statusCode) {
      case 401:
      case 403:
        result.error = INVALID_CREDENTIALS_ERROR;
        break;
      default:
        result.error = SERVER_ERROR;
        break;
    }

    return result;
  }
};

export const signOut = async () => {
  try {
    await axiosClient.post('/auth/logout');
  } catch (error) {}
};
