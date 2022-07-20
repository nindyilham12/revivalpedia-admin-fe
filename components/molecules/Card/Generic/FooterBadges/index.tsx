import { Avatar, AvatarProps, Badge, BadgeProps, HStack } from '@chakra-ui/react';
import { FC } from 'react';

interface BadgesProps extends BadgeProps {
  label: string;
}

type FooterBadgesProps =
  | {
      type: 'avatars';
      avatars: AvatarProps[];
    }
  | {
      type: 'badges';
      badges: BadgesProps[];
    };

export const FooterBadges: FC<FooterBadgesProps> = (props) => {
  const getContent = () => {
    switch (props.type) {
      case 'avatars':
        return props.avatars.map((avatar, i) => (
          <Avatar key={i.toString()} size="24" bg="transparent" {...avatar} />
        ));
      case 'badges':
        return props.badges.map(({ colorScheme, label }, i) => (
          <Badge key={i.toString()} colorScheme={colorScheme}>
            {label}
          </Badge>
        ));
      default:
        return null;
    }
  };

  return <HStack spacing="8">{getContent()}</HStack>;
};
