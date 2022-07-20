import { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  useBoolean,
} from '@chakra-ui/react';
import { IconEye, IconEyeOff } from '@tabler/icons';

export const PasswordInput = forwardRef<{ focus: () => void }, InputProps>(
  ({ onBlur, ...restProps }, forwardedRef) => {
    const [isShown, { toggle }] = useBoolean();
    const [isFocused, { on, off }] = useBoolean();
    const ref = useRef<HTMLInputElement>(null);

    const focus = () => {
      ref.current?.focus();
    };

    useImperativeHandle(forwardedRef, () => {
      return {
        focus,
      };
    });

    return (
      <InputGroup position="relative">
        <Input
          ref={ref}
          type={isShown ? 'text' : 'password'}
          {...restProps}
          onFocus={on}
          onBlur={(e) => {
            off();
            onBlur?.(e);
          }}
          pr="40"
        />
        <InputRightElement
          as={IconButton}
          aria-label={isShown ? 'Hide password' : 'Show password'}
          variant="unstyled"
          icon={isShown ? <IconEyeOff height="100%" /> : <IconEye height="100%" />}
          onClick={() => {
            toggle();
            on();
            ref.current?.focus();
          }}
          opacity={isFocused ? 1 : 0}
        />
      </InputGroup>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
