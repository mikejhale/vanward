import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import WalletContextProvider from '../contexts/WalletContextProvider';
import { AppContext } from '../contexts/AppContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from 'layouts/MainLayout';
import theme from 'theme/theme';
import '../assets/css/Vanward.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const defaultContext = {
  certifications: [],
  setCertifications: (certs) => {},
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext.Provider value={defaultContext}>
      <ChakraProvider theme={theme}>
        <WalletContextProvider>
          <QueryClientProvider client={queryClient}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </QueryClientProvider>
        </WalletContextProvider>
      </ChakraProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
