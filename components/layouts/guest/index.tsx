import { PageLoader } from '@/components';
import { useAuth } from '@/hooks';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';

interface GuestLayoutProps {
  children: ReactNode;
}

export const GuestLayout: FC<GuestLayoutProps> = ({ children }) => {
  const { user, isFetching } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [isFetching, router, user]);

  return (
    <>
      {user || isFetching ? (
        <PageLoader />
      ) : (
        <Flex
          bg="neutral.100"
          h="100vh"
          justifyContent="center"
          pt={{ base: '24', sm: '48' }}
          px={{ base: '16', sm: '24' }}
        >
          {children}
        </Flex>
      )}
    </>
  );
};
