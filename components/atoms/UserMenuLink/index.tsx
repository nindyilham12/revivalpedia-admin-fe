import { FC, ReactNode } from 'react';
import NextLink from 'next/link';
import { Link, LinkProps, Stack, StackItem } from '@chakra-ui/react';

export interface UserMenuCustomProps {
  href: string;
  isActive?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
}

type UserMenuLinkProps = UserMenuCustomProps & LinkProps;

export const UserMenuLink: FC<UserMenuLinkProps> = ({
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
        color="neutral.900"
        bg={isActive ? 'neutral.100' : 'transparent'}
        _hover={{
          bg: 'neutral.100',
        }}
        px="20"
        py="14"
        borderRadius="8"
        textAlign="left"
        fontWeight="semibold"
        _focus={{
          outline: 'none',
          bg: 'neutral.100',
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
