import { Box, Heading } from '@chakra-ui/react';
import { NotConnected } from 'components/wallet/NotConnected';
import type { NextPage } from 'next';
import EnrollForm from '../components/enrollees/EnrollForm';
import { useWallet } from '@solana/wallet-adapter-react';

const certification = 'DSDUWTeorgdphrWHK3rtD7rza9csi7ej5iaaxrQDRsot';

const Certifications: NextPage = () => {
  const wallet = useWallet();

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {wallet.publicKey ? (
        <EnrollForm certification={certification} />
      ) : (
        <NotConnected />
      )}
    </Box>
  );
};

export default Certifications;