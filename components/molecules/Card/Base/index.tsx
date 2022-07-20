import { getComponentChild } from '@/lib/Utils';
import { Box, BoxProps, HStack, useMultiStyleConfig, VStack } from '@chakra-ui/react';
import { FC, ReactElement } from 'react';
import { CardActions, CardActionsProps } from './Actions';
import { CardBody, CardBodyProps } from './Body';
import { CardFooter, CardFooterProps } from './Footer';
import { CardHeader, CardHeaderProps } from './Header';
import { CardThumbnail, CardThumbnailProps } from './Thumbnail';

interface CardComposition {
  Actions: FC<CardActionsProps>;
  Body: FC<CardBodyProps>;
  Footer: FC<CardFooterProps>;
  Header: FC<CardHeaderProps>;
  Thumbnail: FC<CardThumbnailProps>;
}

export interface CardProps extends BoxProps {
  children: ReactElement | ReactElement[];
}

export const Card: FC<CardProps> & CardComposition = ({ children, ...boxProps }) => {
  const styles = useMultiStyleConfig('Card', {});

  return (
    <Box __css={styles.base} {...boxProps}>
      <HStack alignItems="flex-start" h="full" spacing="12" w="full">
        {getComponentChild(children, 'CardThumbnail')}
        <VStack h="full" justifyContent="space-between" spacing="0" w="full">
          <HStack alignItems="flex-start" justifyContent="space-between" spacing="16" w="full">
            <Box w="full">
              {getComponentChild(children, 'CardHeader')}
              {getComponentChild(children, 'CardBody')}
            </Box>
            <Box>{getComponentChild(children, 'CardActions')}</Box>
          </HStack>
          {getComponentChild(children, 'CardFooter')}
        </VStack>
      </HStack>
    </Box>
  );
};

Card.Actions = CardActions;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Header = CardHeader;
Card.Thumbnail = CardThumbnail;
