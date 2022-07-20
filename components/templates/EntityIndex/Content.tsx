import { Box, BoxProps } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';

export interface EntityIndexTemplateContentProps extends BoxProps {
  children: ReactElement | ReactElement[];
}

export const EntityIndexTemplateContent: FC<EntityIndexTemplateContentProps> = ({
  children,
  ...props
}) => {
  return (
    <Box px={{ base: '0', lg: '16' }} py={{ base: '16', lg: '20' }} {...props}>
      {children}
    </Box>
  );
};

EntityIndexTemplateContent.displayName = 'EntityIndexTemplateContent';
