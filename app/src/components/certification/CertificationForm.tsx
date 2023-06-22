import { FC } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
//import DatePicker from '../datepicker/DatePicker';

export const CertificationForm: FC = () => {
  const router = useRouter();
  const [certId, setCertId] = useState('');
  const [endOption, setEndOption] = useState('');
  const [certTitle, setCertTitle] = useState('');

  let startDate = new Date();
  startDate.setDate(startDate.getDate() + 1);
  const [date, setDate] = useState(startDate);

  const handleAddCert = async (event: any) => {
    event.preventDefault();

    console.log('add cert');
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
            <NumberInput width='100px'>
              <NumberInputField />
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
            <SingleDatepicker
              name='date-input'
              date={date}
              onDateChange={setDate}
              minDate={new Date()}
            />
          </FormControl>

          <Button width='200px' mt={4} type='submit'>
            Save Certification
          </Button>
        </form>
      </Box>
    </>
  );
};
