import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addRequirement } from 'rpc/requirements';

const RequirementForm = (props: { certification: string; closeForm: any }) => {
  const [reqModule, setReqModule] = useState('');
  const [reqCredits, setReqCredits] = useState(1);
  const inputColor = useColorModeValue('gray.800', 'gray.200');
  const { certification, closeForm } = props;
  const { connection } = useConnection();
  const wallet = useWallet();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addRequirement,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['requirements']);
      setReqModule('');
      setReqCredits(1);
      closeForm();
    },
  });

  // const { mutate } = useMutation(
  //   ({ wallet, connection, certification, module, credits }) =>
  //     addRequirement(wallet, connection, certification, module, credits)
  // );

  const handleAddReq = async (event: any) => {
    event.preventDefault();

    mutate({
      wallet,
      connection,
      certification,
      module: reqModule,
      credits: reqCredits,
    });
  };

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
            <NumberInput
              //value={reqCredits}
              min={1}
              max={1000}
              width='100px'
              color={inputColor}
              value={reqCredits}
              onChange={(valueAsString, valueAsNumber) =>
                setReqCredits(valueAsNumber)
              }
            >
              <NumberInputField color={inputColor} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button
            mr={8}
            width='140px'
            variant='outline'
            mt={4}
            colorScheme={'navy'}
            onClick={() => {
              setReqModule('');
              setReqCredits(1);
              closeForm();
            }}
          >
            Cancel
          </Button>
          <Button width='200px' mt={4} type='submit' colorScheme={'navy'}>
            {' '}
            Save
          </Button>
        </form>
      </Box>
    </>
  );
};

export default RequirementForm;
