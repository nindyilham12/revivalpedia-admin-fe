import { Image, ImageProps } from '@chakra-ui/react';
import { FC } from 'react';

export interface CardThumbnailProps extends ImageProps {
  alt?: string;
}

export const CardThumbnail: FC<CardThumbnailProps> = ({ alt, ...props }) => {
  return <Image alt={alt} w="72" h="72" rounded="full" {...props} />;
};

CardThumbnail.displayName = 'CardThumbnail';
