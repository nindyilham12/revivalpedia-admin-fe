import { Box, BoxProps } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export interface ComboBoxBaseValueProps extends BoxProps {
  children: ReactElement | ReactElement[];
}

export const ComboBoxBaseValue: FC<ComboBoxBaseValueProps> = ({ children }) => {
  return <Box>{children}</Box>;
};

ComboBoxBaseValue.displayName = 'ComboBoxBaseValue';
