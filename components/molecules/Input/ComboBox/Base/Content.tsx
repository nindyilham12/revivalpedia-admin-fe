import { Box, BoxProps } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export interface ComboBoxBaseContentProps extends BoxProps {
  children: ReactElement | ReactElement[];
}

export const ComboBoxBaseContent: FC<ComboBoxBaseContentProps> = ({ children }) => {
  return <Box pr="8">{children}</Box>;
};

ComboBoxBaseContent.displayName = 'ComboBoxBaseContent';
