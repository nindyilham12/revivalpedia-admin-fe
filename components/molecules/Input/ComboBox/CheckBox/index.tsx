import { FC, useCallback, useRef, useState } from 'react';
import { ComboBoxBase, IComboBoxBaseRef } from '../Base';
import { SearchInput } from '@/components';
import { Box, Skeleton, Stack, Text } from '@chakra-ui/react';
import { CheckBoxItems, ICheckBoxItem } from './Items';

export interface CheckBoxProps {
  inputPlaceholder?: string;
  isLoading?: boolean;
  items: ICheckBoxItem[];
  label: string;
  placeholderText?: string;
  predefinedItems?: ICheckBoxItem[];
  predefinedItemsLabel?: string;
  withSearch?: boolean;
  onChange: (items: ICheckBoxItem[]) => void;
  onOpen?: () => void;
  onReset: () => void;
  onSearch?: (query: string) => void;
}

export const CheckBox: FC<CheckBoxProps> = ({
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
  const [selectedItems, setSelectedItems] = useState<ICheckBoxItem[]>([]);
  const [initialSelectedItems, setInitialSelectedItems] = useState<ICheckBoxItem[]>([]);
  const [query, setQuery] = useState('');
  const [showResetButton, setShowResetButton] = useState(false);
  const forwardRef = useRef<IComboBoxBaseRef>(null);

  const onApplyCallback = useCallback(() => {
    onChange(selectedItems);
    setInitialSelectedItems([...selectedItems]);
    setShowResetButton(selectedItems.length > 0);
  }, [onChange, selectedItems]);

  const onCancel = useCallback(() => {
    setSelectedItems([...initialSelectedItems]);
  }, [initialSelectedItems]);

  const onCheckboxChange = (item: ICheckBoxItem, isChecked: boolean) => {
    if (isChecked) {
      if (selectedItems.find((i) => i.value === item.value)) return;
      setSelectedItems((prev) => [...prev, item]);
      return;
    }
    setSelectedItems((prev) => [...prev.filter((i) => i.value !== item.value)]);
  };

  const onOpenCallback = useCallback(() => {
    setInitialSelectedItems([...selectedItems]);
    setShowResetButton(selectedItems.length > 0);
    onOpen?.();
  }, [onOpen, selectedItems]);

  const onResetCallback = useCallback(() => {
    setSelectedItems([]);
    setInitialSelectedItems([]);
    setShowResetButton(false);
    forwardRef.current?.closeMenu();
    onReset();
  }, [onReset]);

  const onSearchCallback = useCallback(
    (query: string) => {
      setQuery(query);
      onSearch?.(query);
    },
    [onSearch],
  );

  const filterItems = (from: ICheckBoxItem[], to: ICheckBoxItem[]) => {
    return from.filter((i) => to.findIndex((j) => i.value === j.value) === -1);
  };

  return (
    <ComboBoxBase
      ref={forwardRef}
      label={label}
      onOpen={onOpenCallback}
      onReset={onResetCallback}
      disableButton={selectedItems.length < 1}
      showResetButton={showResetButton}
      onApply={onApplyCallback}
      onCancel={onCancel}
      withApplyButton
    >
      <ComboBoxBase.Value>
        <Text
          color={selectedItems.length < 1 ? 'neutral.500' : 'neutral.900'}
          variant="body-md"
          fontWeight="medium"
        >
          {selectedItems.length < 1
            ? placeholderText
            : `${selectedItems[0].label}${
                selectedItems.length > 1 ? ` +${selectedItems.length - 1}` : ''
              }`}
        </Text>
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
          {/* SELECTED ITEMS */}
          {selectedItems.length > 0 && (
            <CheckBoxItems
              items={selectedItems.map((item) => ({ ...item, isChecked: true }))}
              onChange={onCheckboxChange}
            />
          )}

          {/* PREDEFINED ITEMS */}
          {!isLoading && predefinedItems && items.length < 1 && query === '' && (
            <CheckBoxItems
              label={predefinedItemsLabel}
              items={predefinedItems.map((item) => ({
                ...item,
                isChecked: selectedItems.map(({ value }) => value).includes(item.value),
              }))}
              onChange={onCheckboxChange}
            />
          )}

          {isLoading
            ? [...Array(4)].map((_, i) => <Skeleton key={i.toString()} height="36px" rounded="0" />)
            : items.length > 0 && (
                <CheckBoxItems
                  items={filterItems(items, selectedItems).map((item) => ({
                    ...item,
                    isChecked: false,
                  }))}
                  withHighlight
                  highlightPattern={query}
                  onChange={onCheckboxChange}
                />
              )}
        </Stack>
      </ComboBoxBase.Content>
    </ComboBoxBase>
  );
};
