import type { ReactNode } from 'react';
import { SideNavLink } from '@/components/atoms';
import { Link, Stack, StackDivider, StackItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Image from 'next/image';
import {
  IconDeviceGamepad,
  IconNews,
  IconLivePhoto,
  IconSmartHome,
  IconStar,
  IconUserCircle,
  IconUsers,
} from '@tabler/icons';

interface INavLink {
  path: string;
  label: string;
  icon: ReactNode;
}

const NAV_LINKS: INavLink[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: <IconSmartHome />,
  },
  {
    path: '/pemain',
    label: 'Pemain',
    icon: <IconUserCircle />,
  },
  {
    path: '/tim',
    label: 'Tim',
    icon: <IconUsers />,
  },
  {
    path: '/turnamen',
    label: 'Turnamen',
    icon: <IconDeviceGamepad />,
  },
  {
    path: '/berita',
    label: 'Berita',
    icon: <IconNews />,
  },
  {
    path: '/talent',
    label: 'Talent',
    icon: <IconStar />,
  },
];

export const SideNav = () => {
  const router = useRouter();

  return (
    <Stack h="full" bg="surface.white" pb="32" justifyContent="space-between">
      <Stack spacing="16">
        <StackItem px="24" py="28" display={{ base: 'none', lg: 'block' }}>
          <NextLink href="/" passHref>
            <Link display="block" position="relative" width="128px" height="38px">
              <Image src="/logo.png" alt="logo" layout="fill" />
            </Link>
          </NextLink>
        </StackItem>

        <Stack spacing="16" px="12">
          {NAV_LINKS.map((navLink, i) => {
            return (
              <StackItem key={i.toString()}>
                <SideNavLink
                  href={navLink.path}
                  icon={navLink.icon}
                  isActive={router.asPath === navLink.path}
                >
                  {navLink.label}
                </SideNavLink>
              </StackItem>
            );
          })}
          <StackDivider color="neutral.300" border="1px" borderBottom="0" />
          <StackItem>
            <SideNavLink
              href="/livescore"
              icon={<IconLivePhoto color="#E21D2A" />}
              isActive={router.asPath === '/livescore'}
            >
              Live Score
            </SideNavLink>
          </StackItem>
        </Stack>
      </Stack>
    </Stack>
  );
};
