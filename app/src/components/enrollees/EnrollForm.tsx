import { Box, Text, Button } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { web3, utils, BN } from '@coral-xyz/anchor';
import { getProgram } from '../../rpc/program';
import { getFilter } from '../../rpc/memcmpFilter';
import { PublicKey } from '@solana/web3.js';

const EnrollForm = (props: any) => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const program = getProgram(wallet, connection);
  const filter = getFilter(8, wallet.publicKey.toBase58());

  const [enrollmentPda, enrollmentBump] = PublicKey.findProgramAddressSync(
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

    console.log('enroll', enrollmentPda.toString());
  };

  program.account.certification.fetch(props.certification).then((cert) => {
    console.log(cert.enrollmentEnddate?.toString());
  });

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
