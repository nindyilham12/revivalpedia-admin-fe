import { SearchInput } from '@/components/molecules';
import {
  Box,
  Button,
  Collapse,
  Icon,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { IconAdjustmentsHorizontal, IconPoint } from '@tabler/icons';

export interface EntityIndexTemplateFiltersProps {
  children: ReactElement | ReactElement[];
  hasAppliedFilters?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
}

export const EntityIndexTemplateFilters: FC<EntityIndexTemplateFiltersProps> = ({
  children,
  hasAppliedFilters,
  searchPlaceholder,
  onSearch,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const inputSize = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });

  return (
    <Box
      borderTopWidth={{ base: '0', lg: '1px' }}
      borderBottomWidth={{ base: '0', lg: '1px' }}
      borderColor="neutral.300"
      px={{ base: '0', lg: '16' }}
      py={{ base: '16', lg: '12' }}
    >
      <Stack isInline alignItems="stretch" spacing={{ base: '8', lg: '12' }}>
        <SearchInput placeholder={searchPlaceholder} onSearch={onSearch} size={inputSize} />
        <Button
          size={inputSize}
          variant="outlined"
          leftIcon={
            <Icon
              as={hasAppliedFilters ? IconPoint : IconAdjustmentsHorizontal}
              color={hasAppliedFilters ? 'primary.main' : 'inherit'}
              fontSize={{ base: '16', lg: '24' }}
              fill={hasAppliedFilters ? 'primary.main' : 'none'}
            />
          }
          onClick={onToggle}
        >
          Filter
        </Button>
      </Stack>

      <Collapse in={isOpen} transitionEnd={{ enter: { overflow: 'visible' } }}>
        <Box my="12" mt="24">
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

EntityIndexTemplateFilters.displayName = 'EntityIndexTemplateFilters';
