import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import WalletContextProvider from '../contexts/WalletContextProvider';
import { AppContext } from '../contexts/AppContext';
import MainLayout from 'layouts/MainLayout';
import theme from 'theme/theme';
import '../assets/css/Vanward.css';

const setCertifications = () => {
  console.log('setCertifications');
};

const value = { setCerts: setCertifications, certCount: 3 };

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext.Provider value={value}>
      <ChakraProvider theme={theme}>
        <WalletContextProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </WalletContextProvider>
      </ChakraProvider>
    </AppContext.Provider>
  );
}

export default MyApp;
