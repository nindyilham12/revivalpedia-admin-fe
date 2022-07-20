import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';
import { IconSearch, IconX } from '@tabler/icons';
import { ChangeEvent, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

interface SearchInputProps extends InputProps {
  onSearch?: (value: string) => void;
}

export const SearchInput = forwardRef<{ focus: () => void }, SearchInputProps>(
  ({ onSearch, ...props }, forwardedRef) => {
    const [query, setQuery] = useState<string>('');
    const ref = useRef<HTMLInputElement>(null);

    const focus = () => {
      ref.current?.focus();
    };

    const onClear = useCallback(() => {
      setQuery('');
      onSearch?.('');
    }, [onSearch]);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      onSearch?.(e.target.value);
      props.onChange?.(e);
    };

    useImperativeHandle(forwardedRef, () => {
      return {
        focus,
      };
    });

    return (
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none">
          <Icon as={IconSearch} />
        </InputLeftElement>
        <Input ref={ref} pl="42" pr="32" onChange={onChange} value={query} {...props} />
        {query !== '' && (
          <InputRightElement
            as={IconButton}
            variant="unstyled"
            _hover={{ color: 'neutral.700' }}
            onClick={onClear}
            fontSize="16"
          >
            <Icon as={IconX} />
          </InputRightElement>
        )}
      </InputGroup>
    );
  },
);

SearchInput.displayName = 'SearchInput';
