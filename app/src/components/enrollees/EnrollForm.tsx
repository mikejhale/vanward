import {
  Box,
  Text,
  Button,
  Heading,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { web3, utils } from '@coral-xyz/anchor';
import { getProgram } from '../../rpc/program';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import EnrolleeCard from './EnrolleeCard';

const EnrollForm = (props: any) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const program = getProgram(wallet, connection);
  const toast = useToast();
  const [certTitle, setCertTitle] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  const [enrollmentPda] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode('enroll'),
      wallet.publicKey.toBuffer(),
      new PublicKey(props.certification).toBuffer(),
    ],
    program.programId
  );

  useEffect(() => {
    const cert = program.account.certification
      .fetchNullable(props.certification)
      .then((cert: any) => {
        setCertTitle(cert.title);
        const enrollment = program.account.enrollment
          .fetchNullable(enrollmentPda)
          .then((enrollment) => {
            if (enrollment) {
              setAlreadyEnrolled(true);
            }
          });
      });
  }, [props.certification]);

  const handleEnroll = async () => {
    setIsEnrolling(true);
    program.methods
      .enroll()
      .accounts({
        enrollment: enrollmentPda,
        certification: props.certification,
        owner: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc()
      .then((res) => {
        setIsEnrolled(true);
      })
      .catch((err) => {
        setIsEnrolling(false);
        toast({
          title: 'Could Not Enroll',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        console.log(err);
      });
  };

  let enrollStatus = null;
  if (isEnrolled) {
    enrollStatus = <Text>You are enrolled in this certification</Text>;
  } else {
    enrollStatus = <Button onClick={handleEnroll}>Enroll</Button>;
  }

  if (isEnrolling) {
    enrollStatus = (
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='brand.500'
        size='xl'
      />
    );
  }

  if (alreadyEnrolled) {
    enrollStatus = <Text>You are already enrolled in this certification</Text>;
  }

  return (
    <Card
      flexDirection='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Box p={4} margin={2}>
        <Heading mb={5} size='md'>
          {certTitle}
        </Heading>
        {enrollStatus}
      </Box>
    </Card>
  );
};
export default EnrollForm;
