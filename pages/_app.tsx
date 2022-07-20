import { ReactElement, ReactNode } from 'react';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { NextPage } from 'next';
import { MainLayout } from '@/components';

type ComponentProps = NextPage & {
  // eslint-disable-next-line
  getLayout?: (page: ReactElement) => ReactNode;
  title: string;
};

type AppWithPageProps = AppProps & {
  Component: ComponentProps;
};

const App = ({ Component, pageProps }: AppWithPageProps) => {
  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout title={Component.title}>{page}</MainLayout>);

  const content = getLayout(<Component {...pageProps} />);

  return (
    <ChakraProvider theme={theme} resetCSS>
      {content}
    </ChakraProvider>
  );
};

export default App;
