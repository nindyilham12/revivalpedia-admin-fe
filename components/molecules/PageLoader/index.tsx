import { Center, Spinner } from '@chakra-ui/react';

export const PageLoader = () => {
  return (
    <Center h="100vh" bg="neutral.300">
      <Spinner size="xl" />
    </Center>
  );
};
