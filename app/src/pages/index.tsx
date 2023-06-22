import { Box } from '@chakra-ui/react';
import { NotConnected } from 'components/wallet/NotConnected';
import type { NextPage } from 'next';
import CertificationList from '../components/certification/CertificationList';
import { useWallet } from '@solana/wallet-adapter-react';

const Home: NextPage = () => {
  const wallet = useWallet();

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {wallet.publicKey ? <CertificationList /> : <NotConnected />}
    </Box>
  );
};

export default Home;
