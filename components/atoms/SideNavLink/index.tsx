import { FC, ReactNode } from 'react';
import NextLink from 'next/link';
import { Link, LinkProps, Stack, StackItem } from '@chakra-ui/react';

export interface CustomProps {
  href: string;
  isActive?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

type SideNavLinkProps = CustomProps & LinkProps;

export const SideNavLink: FC<SideNavLinkProps> = ({
  children,
  href,
  icon,
  isActive,
  ...restProps
}) => {
  return (
    <NextLink href={href} passHref>
      <Link
        display="block"
        color={isActive ? 'primary.main' : 'neutral.900'}
        bg={isActive ? 'primary.surface' : 'transparent'}
        _hover={{
          bg: 'primary.surface',
          color: 'primary.main',
        }}
        px="20"
        py="14"
        borderRadius="8"
        textAlign="left"
        fontWeight="semibold"
        _focus={{
          outline: 'none',
          bg: 'primary.surface',
          color: 'primary.main',
        }}
        {...restProps}
      >
        <Stack isInline spacing={8}>
          <StackItem>{icon}</StackItem>
          <StackItem>{children}</StackItem>
        </Stack>
      </Link>
    </NextLink>
  );
};
