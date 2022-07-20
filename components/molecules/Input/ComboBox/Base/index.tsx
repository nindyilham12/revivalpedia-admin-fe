import {
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactElement,
  RefAttributes,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  HStack,
  Icon,
  Text,
  Button,
  Box,
  useMultiStyleConfig,
  useDisclosure,
  Collapse,
  Divider,
  useOutsideClick,
} from '@chakra-ui/react';
import { IconChevronDown } from '@tabler/icons';
import { getComponentChild } from '@/lib/Utils';
import { ComboBoxBaseContent, ComboBoxBaseContentProps } from './Content';
import { ComboBoxBaseValue, ComboBoxBaseValueProps } from './Value';

export interface IComboBoxBaseRef {
  closeMenu: () => void;
}

interface ComboBoxBaseProps {
  children: ReactElement | ReactElement[];
  disableButton?: boolean;
  label: string;
  showResetButton?: boolean;
  withApplyButton?: boolean;
  onApply?: () => void;
  onCancel?: () => void;
  onOpen?: () => void;
  onReset?: () => void;
}

interface ComboBoxBaseComposition
  extends ForwardRefExoticComponent<
    PropsWithoutRef<ComboBoxBaseProps> & RefAttributes<IComboBoxBaseRef>
  > {
  Content: FC<ComboBoxBaseContentProps>;
  Value: FC<ComboBoxBaseValueProps>;
}

export const _ComboBoxBase: ForwardRefExoticComponent<
  PropsWithoutRef<ComboBoxBaseProps> & RefAttributes<IComboBoxBaseRef>
> = forwardRef<IComboBoxBaseRef, ComboBoxBaseProps>(
  (
    {
      children,
      disableButton,
      label,
      showResetButton,
      withApplyButton,
      onApply,
      onCancel,
      onOpen,
      onReset,
    },
    forwardedRef,
  ) => {
    const { isOpen, onClose: _onClose, onOpen: _onOpen } = useDisclosure();
    const ref = useRef<HTMLDivElement>(null);
    const styles = useMultiStyleConfig('ComboBox', { isOpen });

    const onApplyCallback = useCallback(() => {
      onApply?.();
      _onClose();
    }, [_onClose, onApply]);

    const onCloseCallback = useCallback(() => {
      onCancel?.();
      _onClose();
    }, [_onClose, onCancel]);

    const onOpenCallback = useCallback(() => {
      onOpen?.();
      _onOpen();
    }, [onOpen, _onOpen]);

    useOutsideClick({
      ref,
      handler: onCloseCallback,
    });

    useImperativeHandle(forwardedRef, () => {
      return {
        closeMenu: _onClose,
      };
    });

    return (
      <Box pos="relative" ref={ref}>
        <HStack w="full" justifyContent="space-between" alignItems="center" mb="4">
          <Text variant="body-md" fontWeight="medium">
            {label}
          </Text>
          <Button
            h="max-content"
            color="primary.main"
            variant="unstyled"
            onClick={onReset}
            _hover={{ color: 'primary.hover' }}
            visibility={showResetButton ? 'visible' : 'hidden'}
          >
            Reset
          </Button>
        </HStack>

        <Box>
          <Button
            variant="unstyled"
            h="full"
            outlineOffset="0"
            outline={isOpen ? '3px solid' : 'initial'}
            outlineColor="primary.border"
            rounded="8"
            w="full"
            _focus={{
              outline: '3px solid',
              outlineColor: 'primary.border',
            }}
            onClick={isOpen ? onCloseCallback : onOpenCallback}
          >
            <HStack __css={styles.buttonStack} data-peer>
              {getComponentChild(children, 'ComboBoxBaseValue')}
              <Icon as={IconChevronDown} __css={styles.icon} />
            </HStack>
          </Button>

          <Box __css={styles.menuWrapper}>
            <Collapse in={isOpen}>
              <Box __css={styles.menu}>
                {getComponentChild(children, 'ComboBoxBaseContent')}
                {withApplyButton ? (
                  <>
                    <Divider borderColor="neutral.300" mt="8" mb="16" />
                    <Box px="16" mb="8">
                      <Button w="full" onClick={onApplyCallback} disabled={disableButton}>
                        Terapkan
                      </Button>
                    </Box>
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </Collapse>
          </Box>
        </Box>
      </Box>
    );
  },
);

_ComboBoxBase.displayName = 'ComboBoxBase';

export const ComboBoxBase = {
  ..._ComboBoxBase,
  Content: ComboBoxBaseContent,
  Value: ComboBoxBaseValue,
} as ComboBoxBaseComposition;
