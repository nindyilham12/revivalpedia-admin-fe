import { ITalent } from '@/typings';
import { MenuItem } from '@chakra-ui/react';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Card } from '../Base';
import { FooterBadges, IconCard } from '../Generic';

const pediaURL = process.env.NEXT_PUBLIC_MAIN_PEDIA_URL as string;

export interface TalentCardProps {
  talent: Pick<ITalent, 'avatar' | 'name' | 'nickname' | 'roles' | 'slug' | 'status'>;
  withDeleteAction?: boolean;
  onDelete?: (slug: string) => void;
}

const getColorScheme = (index: number) => {
  switch (index) {
    case 0:
      return 'violet';
    case 1:
      return 'info';
    default:
      return 'neutral';
  }
};

const sliceRoles = (roles: string[]) => {
  if (roles.length < 3) return roles;
  const remainingLength = roles.length - 2;
  return [roles[0], roles[1], `+${remainingLength}`];
};

export const TalentCard: FC<TalentCardProps> = ({ talent, withDeleteAction, onDelete }) => {
  const router = useRouter();
  const { avatar, name, nickname, roles, slug, status } = talent;

  return (
    <Card>
      <Card.Actions>
        <MenuItem
          display="flex"
          gap="12"
          w="full"
          h="full"
          px="16"
          py="12"
          onClick={() => router.push(`/talent/edit/${slug}`)}
        >
          <IconPencil /> Edit Talent
        </MenuItem>

        {withDeleteAction ? (
          <MenuItem
            color="primary.main"
            display="flex"
            gap="12"
            w="full"
            h="full"
            px="16"
            py="12"
            onClick={() => onDelete?.(slug)}
          >
            <IconTrash /> Hapus Talent
          </MenuItem>
        ) : (
          <></>
        )}
      </Card.Actions>
      <Card.Body>
        <IconCard
          avatar={{ name: nickname, src: avatar }}
          badgeStatus={status === 1 ? 'active' : 'inactive'}
          subtitle={nickname}
          title={name}
          url={`${pediaURL}/talent/${slug}`}
          subTitleProps={{
            color: 'neutral.900',
            fontWeight: 'semibold',
          }}
          titleProps={{
            color: 'neutral.700',
            fontWeight: 'medium',
          }}
        />
      </Card.Body>
      <Card.Footer>
        <FooterBadges
          type="badges"
          badges={
            sliceRoles(roles).map((role, i) => ({
              label: role,
              colorScheme: getColorScheme(i),
            })) ?? []
          }
        />
      </Card.Footer>
    </Card>
  );
};
