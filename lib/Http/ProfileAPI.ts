import { axiosClient } from './axiosClient';

export const updateName = async (name: string) => {
  try {
    const body = { name };
    const { data } = await axiosClient.post(`/profile/edit/name?_method=PATCH`, body);
    if (data.code !== 200) {
      return {
        error: data.message,
      };
    }
    return {
      successName: true,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateEmail = async (email: string) => {
  try {
    const body = { email };
    const { data } = await axiosClient.post(`/profile/edit/email?_method=PATCH`, body);
    if (data.code !== 200) {
      return {
        error: data.message,
      };
    }
    return {
      successEmail: true,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateUsername = async (username: string) => {
  try {
    const body = { username };
    const { data } = await axiosClient.post(`/profile/edit/username?_method=PATCH`, body);
    if (data.code !== 200) {
      return {
        error: data.message,
      };
    }
    return {
      successUsername: true,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string,
  passwordConfirmation: string,
) => {
  try {
    const body = {
      old_password: oldPassword,
      new_password: newPassword,
      password_confirmation: passwordConfirmation,
    };
    const { data } = await axiosClient.post(`/profile/edit/password?_method=PATCH`, body);
    if (data.code !== 200) {
      return {
        error: data.message,
      };
    }
    return {
      successPassword: true,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const updateProfilePicture = async (image: File) => {
  try {
    const body = new FormData();
    body.append('image', image);

    const { data } = await axiosClient.post(`/profile/edit/image?_method=PATCH`, body);
    if (data.code !== 200) {
      return {
        error: data.message,
      };
    }
    return {
      successPhoto: true,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const validationPassword = async (password: string) => {
  try {
    const body = { password };
    const { data } = await axiosClient.post(`/profile/validation`, body);
    if (data.code !== 200) {
      return {
        error: data.message,
      };
    }
    return {
      successValidation: true,
    };
  } catch (error: any) {
    return {
      error: 'Sandi salah. Silahkan coba lagi.',
    };
  }
};

export const getUserProfile = async (slug: string) => {
  try {
    const { data } = await axiosClient.get(`/edit/profile/${slug}`);

    if (data.code === 404) {
      return {
        code: 404,
        error: new Error('User not found'),
      };
    }

    return {
      user: {
        name: data.data.name,
        username: data.data.username,
        image: data.data.profile_photo_url,
        slug,
      },
    };
  } catch (error) {
    return {
      error,
    };
  }
};
