import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  useDisclosure,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { IconDots } from '@tabler/icons';
import { FC, ReactElement } from 'react';

export interface CardActionsProps {
  children: ReactElement | ReactElement[];
}

export const CardActions: FC<CardActionsProps> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const styles = useMultiStyleConfig('Card', { isOpen });

  return (
    <Menu placement="bottom-end" autoSelect={false} isOpen={isOpen} onClose={onClose}>
      <MenuButton
        as={IconButton}
        __css={styles.actionButton}
        aria-label="Menu"
        variant="unstyled"
        icon={<IconDots />}
        onClick={onOpen}
      />
      <MenuList py="16">{children}</MenuList>
    </Menu>
  );
};

CardActions.displayName = 'CardActions';
