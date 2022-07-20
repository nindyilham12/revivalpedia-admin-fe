import { FC, ReactNode, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  StackItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { PageLoader, SideNav, UserMenu } from '@/components';
import { IconBell, IconX, IconMenu2 } from '@tabler/icons';
import NextLink from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/hooks';
import { useRouter } from 'next/router';

export interface MainLayoutProps {
  title: string;
  children?: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  const { user, isFetching } = useAuth();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isFetching) {
      setTimeout(() => {
        router.push('/login');
      }, 500);
    }
  }, [isFetching, router, user]);

  useEffect(() => {
    router.events.on('routeChangeStart', onClose);

    return () => router.events.off('routeChangeStart', onClose);
  }, [router, onClose]);

  const renderLayout = () => {
    return (
      <Flex position="relative" flexDir={{ base: 'column-reverse', lg: 'row' }}>
        <Box
          position={{ base: 'fixed', lg: 'sticky' }}
          top={{ base: '64px', lg: '0' }}
          left="0"
          bottom="0"
          shadow="none"
          borderRight="1px"
          borderColor="neutral.300"
          transition="ease-in-out 250ms"
          w={{ base: 'full', lg: '250px' }}
          transform={{ base: isOpen ? 'translateX(0)' : 'translateX(-100%)', lg: 'translateX(0)' }}
          minW="250px"
          h={{ base: 'calc(100vh - 64px)', lg: '100vh' }}
          zIndex="docked"
        >
          <SideNav />
        </Box>

        <Stack w="full" spacing="0">
          <Stack
            isInline
            px={{ base: '16', lg: '32' }}
            py={{ base: '16', lg: '34' }}
            borderBottom="1px"
            borderColor="neutral.300"
            justifyContent="space-between"
            alignItems="center"
            position="sticky"
            top="0"
            bg="surface.white"
            zIndex="docked"
          >
            <StackItem>
              <Stack display={{ lg: 'none' }} isInline alignItems="center" h="100%" spacing="16">
                <StackItem>
                  <IconButton
                    display="flex"
                    alignItems="center"
                    variant="unstyled"
                    aria-label="Toggle menu"
                    icon={isOpen ? <IconX /> : <IconMenu2 />}
                    onClick={onToggle}
                    h="max-content"
                  />
                </StackItem>
                <StackItem>
                  <NextLink href="/dashboard" passHref>
                    <Link display="block" pos="relative" w="88px" h="26px">
                      <Image src="/logo.png" alt="logo" layout="fill" objectFit="cover" />
                    </Link>
                  </NextLink>
                </StackItem>
              </Stack>
              <Heading size="4" fontWeight="semibold" display={{ base: 'none', lg: 'block' }}>
                {title}
              </Heading>
            </StackItem>
            <StackItem>
              <Stack isInline alignItems="center" spacing="24">
                <StackItem>
                  <NextLink href="/notifikasi" passHref>
                    <Link
                      _hover={{ color: 'primary.main' }}
                      display="block"
                      _focus={{
                        boxShadow: 'none',
                        outlineWidth: '3px',
                        outlineColor: 'primary.surface',
                      }}
                    >
                      <Box pos="relative">
                        <Box
                          pos="absolute"
                          bg="primary.main"
                          borderRadius="full"
                          left="100%"
                          top="30%"
                          transform="translate(-12px, -50%)"
                          px="3px"
                          py="2px"
                        >
                          <Text variant="body-xs" color="surface.white">
                            9+
                          </Text>
                        </Box>
                        <IconBell />
                      </Box>
                    </Link>
                  </NextLink>
                </StackItem>
                <StackItem>
                  <UserMenu />
                </StackItem>
              </Stack>
            </StackItem>
          </Stack>

          <Box p="32">{children}</Box>
        </Stack>
      </Flex>
    );
  };

  return <>{user ? renderLayout() : <PageLoader />}</>;
};
