import { FC } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { addRequirement } from 'rpc/requirements';

const RequirementForm = (props: { certification: string }) => {
  const router = useRouter();
  const [reqModule, setReqModule] = useState('');
  const [reqCredits, setReqCredits] = useState(1);
  const inputColor = useColorModeValue('gray.800', 'gray.200');
  const { certification } = props;
  const { connection } = useConnection();
  const wallet = useWallet();
  const { mutate } = useMutation(
    ({ wallet, connection, certification, module, credits }) =>
      addRequirement(wallet, connection, certification, module, credits)
  );

  const handleAddReq = async (event: any) => {
    event.preventDefault();

    mutate({
      wallet: wallet,
      connection: connection,
      certification: certification,
      module: reqModule,
      credits: reqCredits,
    });
  };
  /*
    const [requirementPda, reqBump] = await PublicKey.findProgramAddressSync(
      [
        utils.bytes.utf8.encode('requirement'),
        utils.bytes.utf8.encode(reqModule),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    console.log(certificationAddress);

    const tx = await program.methods
      .addRequirement(reqModule, reqCredits)
      .accounts({
        requirement: requirementPda,
        certification: new PublicKey(certificationAddress),
        user: provider.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log('Account Created (Requirement)', tx);
    router.push('/');
  };
*/
  return (
    <>
      <Box p={4} display={{ md: 'flex' }} margin={2}>
        <form onSubmit={handleAddReq}>
          <FormControl mb={6} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              color={inputColor}
              width='600px'
              id='module'
              value={reqModule}
              maxLength={24}
              onChange={(event) => setReqModule(event.currentTarget.value)}
            />
          </FormControl>

          <FormControl mb={6} isRequired>
            <FormLabel>Credits</FormLabel>
            <Input
              id='credits'
              color={inputColor}
              value={reqCredits}
              min={1}
              max={1000}
              type='number'
              onChange={(event) =>
                setReqCredits(parseInt(event.currentTarget.value))
              }
            />
          </FormControl>
          <Button
            width='200px'
            mt={4}
            type='submit'
            //backgroundColor={useColorModeValue('brand.500', 'gray.200')}
            colorScheme={'navy'}
          >
            {' '}
            Save
          </Button>
        </form>
      </Box>
    </>
  );
};

export default RequirementForm;
