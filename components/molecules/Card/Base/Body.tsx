import { Box, BoxProps, useMultiStyleConfig } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export interface CardBodyProps extends BoxProps {
  children: ReactElement | ReactElement[];
}

export const CardBody: FC<CardBodyProps> = ({ children, ...boxProps }) => {
  const styles = useMultiStyleConfig('Card', {});

  return (
    <Box __css={styles.body} {...boxProps}>
      {children}
    </Box>
  );
};

CardBody.displayName = 'CardBody';
