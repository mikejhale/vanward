import { FC, useEffect } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { addCertification } from 'rpc/certifications';
import DatePicker from '../datepicker/DatePicker';
import NftForm from './NftForm';

export const CertificationForm: FC = () => {
  const [certId, setCertId] = useState('');
  const [endOption, setEndOption] = useState('');
  const [addingNft, setAddingNft] = useState(false);
  const [certTitle, setCertTitle] = useState('');
  const [nftUri, setNftUri] = useState('');
  const [issueNft, setIssueNft] = useState(false);
  const [maxEnrollees, setMaxEnrollees] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const inputColor = useColorModeValue('gray.800', 'gray.200');
  const { connection } = useConnection();
  const wallet = useWallet();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: addCertification,
    onSuccess: (data) => {
      router.push(`/certifications/list`);
    },
  });

  const handleAddCert = async (event: any) => {
    event.preventDefault();

    mutate({
      wallet: wallet,
      connection: connection,
      id: certId,
      title: certTitle,
      maxEnrollees: endOption === 'max_enrollees' ? maxEnrollees : 0,
      endDate: endOption === 'enrollment_enddate' ? endDate : 0,
      nftUri: issueNft ? nftUri : '',
    });
  };

  const handleEndOption = (event: any) => {
    setEndOption(event.target.value);
  };

  const handleSelectDate = (date: number) => {
    setEndDate(date);
  };

  const handleIssueNft = (event: any) => {
    setIssueNft(event.target.checked);
    event.target.checked && !nftUri ? setAddingNft(true) : setAddingNft(false);
  };

  const handleAddNft = (imgUri: string) => {
    console.log('imgUri', imgUri);
    setAddingNft(false);
    setNftUri(imgUri);
  };

  // useEffect(() => {
  //   console.log('Issue NFT', issueNft);
  // }, [issueNft]);

  console.log('Adding NFT', addingNft);

  const nft = () => {
    if (issueNft && !nftUri) {
      return <NftForm addingNft={setAddingNft} nftUri={handleAddNft} />;
    } else if (issueNft && nftUri) {
      return <Text>{nftUri}</Text>;
    }
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
            <NumberInput
              width='100px'
              color={inputColor}
              onChange={(valueAsString, valueAsNumber) =>
                setMaxEnrollees(valueAsNumber)
              }
            >
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
            <DatePicker selectDate={handleSelectDate} />
          </FormControl>

          <FormControl display='flex' alignItems='center'>
            <FormLabel htmlFor='issuenft' mb='0'>
              Issue NFT on completion?
            </FormLabel>
            <Switch id='issuenft' onChange={handleIssueNft} />
          </FormControl>

          {nft()}

          <Button
            isDisabled={addingNft}
            width='200px'
            mt={8}
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
