import { useEffect } from 'react';
import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Box,
  Heading,
  IconButton,
  Icon,
  CardFooter,
  Divider,
  useToast,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import EnrolleeCount from './EnrolleeCount';
import EnrollmentStatus from './EnrollmentStatus';
import { HiUsers } from 'react-icons/hi';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { RiFileCopy2Line } from 'react-icons/ri';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const CertificationCard = (props: any) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.700', 'Gray.200');
  const cardColor = useColorModeValue('white', 'navy.800');
  const divderColor = useColorModeValue(
    'secondaryGray.200',
    'secondaryGray.700'
  );
  const [value, copy] = useCopyToClipboard();
  const toast = useToast();
  const certification = props.certification;

  useEffect(() => {
    if (value) {
      toast({
        title: 'Copied Address',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [value]);

  return (
    <Card
      maxW='md'
      display='flex'
      flexDirection='column'
      width='100%'
      position='relative'
      borderRadius='20px'
      minWidth='0px'
      bg={cardColor}
      backgroundClip='border-box'
    >
      <CardHeader p={8} pb={2}>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Box>
            <Flex w='100%'>
              <Heading flexGrow='1' size={'md'} mb={2} color={textColor}>
                {certification.title}
              </Heading>
              <Tooltip hasArrow label='Copy address' placement='top'>
                <IconButton
                  aria-label='Copy address'
                  variant='link'
                  title='copy address'
                  icon={<RiFileCopy2Line />}
                  onClick={() => copy(props.publickey)}
                />
              </Tooltip>
            </Flex>

            <Text color={textColorSecondary}>{certification.id}</Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody
        mt={0}
        ml={4}
        mb={3}
        pt={1}
        pl={4}
        pr={8}
        pb={1}
        display='flex'
        flexDirection='column'
      >
        {certification.maxEnrollees > 0 ? (
          <EnrolleeCount
            count={certification.count}
            max={certification.maxEnrollees}
          />
        ) : (
          <Box w='100%' mt='auto'>
            <Flex w='100%' justify='space-between' mb='10px'>
              <Text color={textColor} fontSize='sm'>
                {parseInt(certification.enrolleeCount) || 0} Enrollee
                {certification.enrolleeCount != 1 ? 's' : ''}
              </Text>
              {certification.enrollmentEnddate > 0 && (
                <Text color={textColor} fontSize='sm'>
                  Enrollment ends:{' '}
                  {new Date(certification.enrollmentEnddate.toNumber() * 1000)
                    .toISOString()
                    .slice(0, 10)}
                </Text>
              )}
            </Flex>
          </Box>
        )}
        <Flex
          flexGrow={1}
          flexDirection='row'
          textAlign='left'
          alignItems='center'
          mt={2}
        ></Flex>
      </CardBody>
      <Divider borderColor={divderColor} />
      <CardFooter justify={'flex-end'} alignItems='center' flexWrap='wrap'>
        <Box flexGrow='1'>
          <EnrollmentStatus
            maxEnrollees={certification.maxEnrollees}
            endDate={certification.endDate}
          />
        </Box>
        <Tooltip hasArrow label='Manage Requirements' placement='top'>
          <NextLink
            href={'/certifications/reqs?cert=' + props.publickey}
            passHref
          >
            <IconButton
              variant='outline'
              icon={<MdFormatListBulletedAdd />}
              size='lg'
              aria-label='Add Requirement'
              mr={4}
              color={useColorModeValue('brand.500', 'gray.200')}
            />
          </NextLink>
        </Tooltip>
        <Tooltip hasArrow label='Enrollees' placement='top'>
          <NextLink
            href={'/certifications/enrollments?cert=' + props.publickey}
            passHref
          >
            <IconButton
              variant='outline'
              icon={<HiUsers />}
              size='lg'
              aria-label='Enrollees'
              title='Enrollees'
              mr={4}
              color={useColorModeValue('brand.500', 'gray.200')}
            />
          </NextLink>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};
export default CertificationCard;
