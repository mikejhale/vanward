import { Box } from '@chakra-ui/react';
import { NotConnected } from 'components/wallet/NotConnected';
import type { NextPage } from 'next';
import EnrollForm from '../components/enrollees/EnrollForm';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

const Certifications: NextPage = () => {
  const wallet = useWallet();
  const router = useRouter();

  const certification = router.query.cert as string;

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
