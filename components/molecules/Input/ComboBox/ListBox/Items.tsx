import { HighlightedText } from '@/components/molecules/HighlightedText';
import { Box, Button, Image, Text, useMultiStyleConfig, VStack } from '@chakra-ui/react';
import { FC } from 'react';

export interface IListItem {
  imageSrc?: string;
  label: string;
}

export interface ListBoxItemsProps {
  items: IListItem[];
  highlightPattern?: string;
  label?: string;
  withHighlight?: boolean;
  onSelect: (item: IListItem) => void;
}

export const ListBoxItems: FC<ListBoxItemsProps> = ({
  highlightPattern,
  items,
  label,
  withHighlight,
  onSelect,
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
        <Button
          key={i.toString()}
          variant="unstyled"
          __css={styles.listBoxItem}
          onClick={() => onSelect(item)}
        >
          {item.imageSrc && (
            <Image
              alt={item.label}
              src={item.imageSrc}
              w="24"
              h="24"
              objectFit="contain"
              objectPosition="center"
              mr="8"
            />
          )}
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
        </Button>
      ))}
    </VStack>
  );
};
