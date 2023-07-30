import { Box, Text, Button } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { web3, utils } from '@coral-xyz/anchor';
import { getProgram } from '../../rpc/program';
import { PublicKey } from '@solana/web3.js';

const EnrollForm = (props: any) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const program = getProgram(wallet, connection);

  const [enrollmentPda] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode('enroll'),
      wallet.publicKey.toBuffer(),
      new PublicKey(props.certification).toBuffer(),
    ],
    program.programId
  );

  const handleEnroll = async () => {
    program.methods
      .enroll()
      .accounts({
        enrollment: enrollmentPda,
        certification: props.certification,
        owner: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();
  };

  return (
    <Card
      flexDirection='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Box p={4} margin={2}>
        <Text>ENROLL HERE</Text>
        <Button onClick={handleEnroll}>Enroll</Button>
      </Box>
    </Card>
  );
};
export default EnrollForm;
