import {
  Avatar,
  AvatarBadge,
  AvatarProps,
  Box,
  Link,
  Text,
  TextProps,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import NextLink from 'next/link';

const BADGE_COLORS = {
  active: 'success.main',
  inactive: 'error.main',
};

interface IconCardContentProps {
  subtitle?: string;
  title?: string;
  url?: string;
  titleProps?: TextProps;
  subTitleProps?: TextProps;
}

export interface IconCardProps extends IconCardContentProps {
  avatar: AvatarProps;
  badgeStatus?: keyof typeof BADGE_COLORS;
}

const IconCardContent: FC<IconCardContentProps> = ({
  subtitle,
  subTitleProps,
  title,
  titleProps,
  url,
}) => {
  const content = (
    <>
      {title && (
        <Text
          as="h3"
          color="neutral.900"
          fontWeight="semibold"
          mb="4"
          variant="body-md"
          _groupHover={{ color: 'inherit' }}
          _groupFocus={{ color: 'inherit' }}
          {...titleProps}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          color="neutral.700"
          fontWeight="medium"
          variant="body-sm"
          _groupHover={{ color: 'inherit' }}
          _groupFocus={{ color: 'inherit' }}
          {...subTitleProps}
        >
          {subtitle}
        </Text>
      )}
    </>
  );

  if (url) {
    return (
      <NextLink href={url} passHref>
        <Link
          mb="12"
          role="group"
          target="_blank"
          _hover={{
            color: 'primary.main',
          }}
          _focus={{
            outline: 'none',
            color: 'primary.main',
          }}
        >
          {content}
        </Link>
      </NextLink>
    );
  }

  return <Box mb="12">{content}</Box>;
};

export const IconCard: FC<IconCardProps> = ({
  avatar,
  badgeStatus,
  subtitle,
  subTitleProps,
  title,
  titleProps,
  url,
}) => {
  return (
    <VStack alignItems="flex-start" spacing="20">
      <Box>
        <Avatar bg="transparent" {...avatar}>
          {badgeStatus && (
            <AvatarBadge bg={BADGE_COLORS[badgeStatus]} bottom="6" boxSize="16" right="4" />
          )}
        </Avatar>
      </Box>

      <Box>{IconCardContent({ subtitle, subTitleProps, title, titleProps, url })}</Box>
    </VStack>
  );
};
