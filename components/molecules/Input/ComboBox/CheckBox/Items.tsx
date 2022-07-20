import { HighlightedText } from '@/components/molecules/HighlightedText';
import { Box, Checkbox, Text, useMultiStyleConfig, VStack } from '@chakra-ui/react';
import { FC } from 'react';

export interface ICheckBoxItem {
  label: string;
  value: string;
  isChecked?: boolean;
}

export interface CheckBoxItemsProps {
  items: ICheckBoxItem[];
  highlightPattern?: string;
  label?: string;
  withHighlight?: boolean;
  onChange: (item: ICheckBoxItem, isChecked: boolean) => void;
}

export const CheckBoxItems: FC<CheckBoxItemsProps> = ({
  highlightPattern,
  items,
  label,
  withHighlight,
  onChange,
}) => {
  const styles = useMultiStyleConfig('ComboBox', {});

  return (
    <VStack spacing="8">
      {label && (
        <Box w="full" px="16" mt="8">
          <Text variant="overline-md" textAlign="left">
            {label}
          </Text>
        </Box>
      )}
      {items.map((item, i) => (
        <Checkbox
          __css={styles.checkBoxItem}
          key={i.toString()}
          isChecked={item.isChecked}
          value={item.value}
          onChange={({ target }) => onChange(item, target.checked)}
        >
          {withHighlight ? (
            <HighlightedText
              text={item.label}
              pattern={highlightPattern ?? ''}
              variant="body-md"
              color="neutral.900"
            />
          ) : (
            <Text variant="body-md" color="neutral.900">
              {item.label}
            </Text>
          )}
        </Checkbox>
      ))}
    </VStack>
  );
};
