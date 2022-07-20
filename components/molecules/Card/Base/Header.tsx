import { Box, BoxProps, useMultiStyleConfig } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export interface CardHeaderProps extends BoxProps {
  children: ReactElement | ReactElement[];
}

export const CardHeader: FC<CardHeaderProps> = ({ children, ...boxProps }) => {
  const styles = useMultiStyleConfig('Card', {});

  return (
    <Box __css={styles.header} {...boxProps}>
      {children}
    </Box>
  );
};

CardHeader.displayName = 'CardHeader';
