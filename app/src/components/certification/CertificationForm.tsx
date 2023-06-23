import { FC } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { addCertification } from 'rpc/certifications';
import DatePicker from '../datepicker/DatePicker';
import { TbBrandAirbnb } from 'react-icons/tb';

export const CertificationForm: FC = () => {
  const router = useRouter();
  const [certId, setCertId] = useState('');
  const [endOption, setEndOption] = useState('');
  const [certTitle, setCertTitle] = useState('');
  const { colorMode } = useColorMode();
  const inputColor = useColorModeValue('gray.800', 'gray.200');
  const { connection } = useConnection();
  const wallet = useWallet();
  const { mutate } = useMutation(
    ({ wallet, connection, id, title, endType, maxEnrollees, endDate }) =>
      addCertification(
        wallet,
        connection,
        id,
        title,
        endType,
        maxEnrollees,
        endDate
      )
  );

  const handleAddCert = async (event: any) => {
    event.preventDefault();
    console.log('add cert');
    mutate({
      wallet: wallet,
      connection: connection,
      id: certId,
      title: certTitle,
      endType: 1,
      maxEnrollees: 1000,
      endDate: 0,
    });
  };

  const handleEndOption = (event: any) => {
    console.log(event.target.value);
    setEndOption(event.target.value);
  };

  return (
    <>
      <Box p={4} display={{ md: 'flex' }} margin={2}>
        <form onSubmit={handleAddCert}>
          <FormControl mb={6} isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              color={inputColor}
              width='600px'
              id='certTitle'
              value={certTitle}
              maxLength={120}
              onChange={(event) => setCertTitle(event.currentTarget.value)}
            />
          </FormControl>

          <FormControl mb={6} isRequired>
            <FormLabel>ID</FormLabel>
            <Input
              color={inputColor}
              width='240px'
              id='certId'
              value={certId}
              maxLength={24}
              onChange={(event) => setCertId(event.currentTarget.value)}
            />
          </FormControl>

          <FormControl mb={6} width='240px'>
            <FormLabel>End Enrollments</FormLabel>
            <Select onChange={handleEndOption}>
              <option value=''>None (Open Enrollment)</option>
              <option value='max_enrollees'>Maximum Enrollees</option>
              <option value='enrollment_enddate'>End Date</option>
            </Select>
          </FormControl>

          <FormControl
            mb={6}
            hidden={endOption !== 'max_enrollees'}
            isRequired={endOption === 'max_enrollees'}
          >
            <FormLabel>Max Enrollee Count</FormLabel>
            <NumberInput width='100px' color={inputColor}>
              <NumberInputField color={inputColor} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl
            mb={6}
            hidden={endOption !== 'enrollment_enddate'}
            isRequired={endOption === 'enrollment_enddate'}
          >
            <FormLabel>Enrollment End Date</FormLabel>
            <DatePicker />
          </FormControl>

          <Button
            width='200px'
            mt={4}
            type='submit'
            //backgroundColor={useColorModeValue('brand.500', 'gray.200')}
            colorScheme={'navy'}
          >
            Save Certification
          </Button>
        </form>
      </Box>
    </>
  );
};
