import { ReactNode } from 'react';
import { Center, Heading, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { IconArrowLeft } from '@tabler/icons';
import Head from 'next/head';

const Error = () => {
  return (
    <>
      <Head>
        <title>RevivaLPedia | 404</title>
      </Head>

      <Center h="100vh" pb="48">
        <Stack>
          <Heading as="h1">Halaman tidak detemukan</Heading>
          <NextLink href="/dashboard" passHref>
            <Link _hover={{ color: 'primary.main' }} display="inline-flex" justifyContent="center">
              <IconArrowLeft /> Kembali ke Dashboard
            </Link>
          </NextLink>
        </Stack>
      </Center>
    </>
  );
};

Error.getLayout = (page: ReactNode) => {
  return page;
};

export default Error;
