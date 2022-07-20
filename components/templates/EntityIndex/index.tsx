import { Badge, Button, Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { IconPlus } from '@tabler/icons';
import { useRouter } from 'next/router';
import { getComponentChild } from '@/lib/Utils';
import { EntityIndexTemplateFilters, EntityIndexTemplateFiltersProps } from './Filters';
import { EntityIndexTemplateContent, EntityIndexTemplateContentProps } from './Content';
import { ScrollToTop } from '@/components';

interface EntityIndexTemplateProps {
  badgeText?: string;
  buttonText: string;
  buttonUrl: string;
  children: ReactElement | ReactElement[];
  title?: string;
}

interface EntityIndexTemplateComposition {
  Content: FC<EntityIndexTemplateContentProps>;
  Filters: FC<EntityIndexTemplateFiltersProps>;
}

export const EntityIndexTemplate: FC<EntityIndexTemplateProps> & EntityIndexTemplateComposition = ({
  badgeText,
  buttonText,
  buttonUrl,
  children,
  title,
}) => {
  const router = useRouter();

  return (
    <>
      <Stack
        borderWidth={{ base: '0', lg: '1px' }}
        borderColor="neutral.300"
        rounded="8"
        spacing="0"
        m={{ base: '16', md: '24', lg: '16', xl: '24' }}
      >
        <Stack
          isInline
          alignItems="center"
          justifyContent="space-between"
          px={{ base: '0', lg: '24' }}
          py={{ base: '0', lg: '20' }}
        >
          <Stack isInline alignItems="center" spacing="8">
            <Text variant="body-xl" fontWeight="semibold" color="neutral.900">
              {title}
            </Text>
            {badgeText && <Badge colorScheme="info">{badgeText}</Badge>}
          </Stack>

          <Button
            leftIcon={<Icon as={IconPlus} fontSize="24" />}
            onClick={() => router.push(buttonUrl)}
            display={{ base: 'none', lg: 'flex' }}
          >
            {buttonText}
          </Button>
        </Stack>

        {getComponentChild(children, 'EntityIndexTemplateFilters')}
        {getComponentChild(children, 'EntityIndexTemplateContent')}
      </Stack>
      <IconButton
        aria-label={buttonText}
        icon={<IconPlus />}
        pos="fixed"
        bottom="64px"
        right="32"
        p="12"
        isRound
        display={{ base: 'block', lg: 'none' }}
        onClick={() => router.push(buttonUrl)}
      />

      <ScrollToTop bottom={{ base: '124px', lg: '64px' }} />
    </>
  );
};

EntityIndexTemplate.Content = EntityIndexTemplateContent;
EntityIndexTemplate.Filters = EntityIndexTemplateFilters;
