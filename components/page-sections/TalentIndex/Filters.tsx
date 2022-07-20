import { EntityIndexTemplate, RadioCard } from '@/components';
import { ROLE_OPTIONS, STATUS_OPTIONS } from '@/lib/Const';
import { ISearchTalentParams } from '@/lib/Http';
import { Box, Stack, Text, useBreakpointValue, useRadioGroup } from '@chakra-ui/react';
import { debounce } from 'lodash';
import { FC, useCallback } from 'react';

export interface TalentIndexFiltersProps {
  onChange: (params: Partial<ISearchTalentParams>) => void;
}

export const TalentIndexFilters: FC<TalentIndexFiltersProps> = ({ onChange }) => {
  const inlineFilter = useBreakpointValue({ base: false, lg: true });

  const onChangeCallback = useCallback(
    (params: Partial<ISearchTalentParams>) => {
      onChange(params);
    },
    [onChange],
  );

  const { getRadioProps: statusRadioProps, value: statusValue } = useRadioGroup({
    defaultValue: STATUS_OPTIONS[0].value,
    onChange: (value: string) => onChangeCallback({ status: value }),
  });

  const { getRadioProps: roleRadioProps, value: roleValue } = useRadioGroup({
    defaultValue: ROLE_OPTIONS[0].value,
    onChange: (value: string) => onChangeCallback({ roles: value }),
  });

  const onSearch = debounce((query: string) => {
    onChangeCallback({ search: query });
  }, 500);

  return (
    <EntityIndexTemplate.Filters
      searchPlaceholder="Nama talent atau nickname"
      hasAppliedFilters={statusValue !== '' || roleValue !== ''}
      onSearch={onSearch}
    >
      <Stack isInline={inlineFilter} spacing="24" wrap="wrap">
        <Box>
          <Text mb="4" fontWeight="medium">
            Status Talent
          </Text>
          <Stack isInline>
            {STATUS_OPTIONS.map((option) => {
              const radio = statusRadioProps({ value: option.value, defaultValue: '' });
              return (
                <RadioCard key={option.value} radioProps={radio}>
                  {option.label}
                </RadioCard>
              );
            })}
          </Stack>
        </Box>
        <Box>
          <Text mb="4" fontWeight="medium">
            Role
          </Text>
          <Stack isInline>
            {ROLE_OPTIONS.map((option) => {
              const radio = roleRadioProps({ value: option.value, defaultValue: '' });
              return (
                <RadioCard key={option.value} radioProps={radio}>
                  {option.label}
                </RadioCard>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </EntityIndexTemplate.Filters>
  );
};

TalentIndexFilters.displayName = 'EntityIndexTemplateFilters';
