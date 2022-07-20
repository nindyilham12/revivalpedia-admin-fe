import { Skeleton, SkeletonProps } from '@chakra-ui/react';
import { FC } from 'react';

export interface SkeletonCardProps extends SkeletonProps {
  amount?: number;
}

export const SkeletonCard: FC<SkeletonCardProps> = ({ amount = 1, ...props }) => {
  return (
    <>
      {[...Array(amount)].map((_, i) => (
        <Skeleton key={i.toString()} rounded="8" height="200px" {...props} />
      ))}
    </>
  );
};
