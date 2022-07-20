import { axiosClient, getUserInfo, signIn as _signIn, signOut as _signOut } from '@/lib/Http';
import useStore from '@/stores';
import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
  const [isFetching, setIsFetching] = useState(true);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const fetchUser = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setIsFetching(false);
      return;
    }

    axiosClient.defaults.headers.common['Authorization'] = accessToken;

    const { success, user } = await getUserInfo();
    if (!success) {
      localStorage.removeItem('access_token');
    }
    setUser(user);
    setIsFetching(false);
  }, [setUser]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const result = await _signIn(email, password);
      setUser(result.user);
      return result;
    },
    [setUser],
  );

  const signOut = useCallback(async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    await _signOut();
  }, [setUser]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, isFetching, fetchUser, signIn, signOut };
};
