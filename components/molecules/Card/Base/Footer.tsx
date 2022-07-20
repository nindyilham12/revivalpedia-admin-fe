import { Box, BoxProps, useMultiStyleConfig } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export interface CardFooterProps extends BoxProps {
  children: ReactElement | ReactElement[];
}

export const CardFooter: FC<CardFooterProps> = ({ children, ...boxProps }) => {
  const styles = useMultiStyleConfig('Card', {});

  return (
    <Box __css={styles.footer} {...boxProps}>
      {children}
    </Box>
  );
};

CardFooter.displayName = 'CardFooter';
