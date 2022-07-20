import { FC, useCallback, useRef, useState } from 'react';
import { Box, Image, Skeleton, Stack, Text } from '@chakra-ui/react';
import { ComboBoxBase, IComboBoxBaseRef } from '../Base';
import { SearchInput } from '@/components';
import { IListItem, ListBoxItems } from './Items';

export interface ListBoxProps {
  inputPlaceholder?: string;
  isLoading?: boolean;
  items: IListItem[];
  label: string;
  placeholderText?: string;
  predefinedItems?: IListItem[];
  predefinedItemsLabel?: string;
  withSearch?: boolean;
  onChange: (item: IListItem | null) => void;
  onOpen?: () => void;
  onReset: () => void;
  onSearch?: (query: string) => void;
}

export const ListBox: FC<ListBoxProps> = ({
  inputPlaceholder,
  isLoading,
  items,
  label,
  placeholderText,
  predefinedItems,
  predefinedItemsLabel,
  withSearch,
  onChange,
  onOpen,
  onReset,
  onSearch,
}) => {
  const forwardRef = useRef<IComboBoxBaseRef>(null);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<IListItem | null>(null);

  const onOpenCallback = useCallback(() => {
    onOpen?.();
  }, [onOpen]);

  const onResetCallback = useCallback(() => {
    setSelectedItem(null);
    onReset();
  }, [onReset]);

  const onSearchCallback = useCallback(
    (query: string) => {
      setQuery(query);
      onSearch?.(query);
    },
    [onSearch],
  );

  const onSelectCallback = useCallback(
    (item: IListItem) => {
      setSelectedItem(item);
      onChange(item);
      forwardRef.current?.closeMenu();
    },
    [onChange],
  );

  return (
    <ComboBoxBase
      ref={forwardRef}
      label={label}
      showResetButton={selectedItem !== null}
      onOpen={onOpenCallback}
      onReset={onResetCallback}
    >
      <ComboBoxBase.Value>
        {selectedItem ? (
          <Stack isInline alignItems="center" spacing="8">
            {selectedItem.imageSrc && (
              <Image
                alt={selectedItem.label}
                src={selectedItem.imageSrc}
                w="24"
                h="24"
                objectFit="contain"
                objectPosition="center"
              />
            )}
            <Text color="neutral.900" variant="body-md" fontWeight="medium">
              {selectedItem.label}
            </Text>
          </Stack>
        ) : (
          <Text color="neutral.500" variant="body-md" fontWeight="medium">
            {placeholderText}
          </Text>
        )}
      </ComboBoxBase.Value>
      <ComboBoxBase.Content>
        {withSearch ? (
          <Box px="16" py="8">
            <SearchInput value={query} onSearch={onSearchCallback} placeholder={inputPlaceholder} />
          </Box>
        ) : (
          <></>
        )}

        <Stack maxH="400px" overflowY="auto" spacing="8">
          {/* PREDEFINED ITEMS */}
          {!isLoading && predefinedItems && items.length < 1 && query === '' && (
            <ListBoxItems
              items={predefinedItems}
              label={predefinedItemsLabel}
              onSelect={onSelectCallback}
            />
          )}

          {isLoading
            ? [...Array(4)].map((_, i) => <Skeleton key={i.toString()} height="36px" rounded="0" />)
            : items.length > 0 && (
                <ListBoxItems
                  items={items}
                  withHighlight
                  highlightPattern={query}
                  onSelect={onSelectCallback}
                />
              )}
        </Stack>
      </ComboBoxBase.Content>
    </ComboBoxBase>
  );
};
