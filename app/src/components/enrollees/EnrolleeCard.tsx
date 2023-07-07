import { useEffect } from 'react';
import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Box,
  Icon,
  Heading,
  IconButton,
  CardFooter,
  Divider,
  useToast,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { shortAddress } from 'utils/address';
import { countBitsSet } from 'utils/numbers';
import NextLink from 'next/link';
import { HiUsers } from 'react-icons/hi';
import {} from 'react-icons/ri';
import {
  RiCheckboxCircleLine,
  RiFileCopy2Line,
  RiCheckDoubleFill,
} from 'react-icons/ri';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

const EnrolleeCard = (props: any) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.700', 'Gray.200');
  const iconColor = useColorModeValue('brand.500', 'gray.200');
  const cardColor = useColorModeValue('white', 'navy.800');
  const divderColor = useColorModeValue(
    'secondaryGray.200',
    'secondaryGray.700'
  );
  const [value, copy] = useCopyToClipboard();
  const toast = useToast();
  const enrollee = props.enrollee;

  useEffect(() => {
    if (value) {
      toast({
        title: 'Copied Address',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const requirementsComplete = countBitsSet(
    enrollee.account.completedRequirements
  );

  let completion = null;
  if (enrollee.account.complete) {
    // format timestamp as YYYY-MM-DD
    const date = new Date(enrollee.account.completedDate * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formattedDate = date.toLocaleDateString();

    completion = <Text>Completion Date: {formattedDate}</Text>;
  }

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
          <Heading size={'md'} mb={2} color={textColor}>
            {shortAddress(enrollee.account.owner.toString())}
          </Heading>
          <Tooltip hasArrow label='Copy address' placement='top'>
            <IconButton
              flexGrow={1}
              justifyContent='flex-start'
              aria-label='Copy address'
              variant='link'
              icon={<RiFileCopy2Line />}
              onClick={() => copy(enrollee.account.owner.toString())}
            />
          </Tooltip>
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
        <Box w='100%' mt='auto'>
          <Flex w='100%' justify='space-between' mb='10px'>
            <Text color={textColorSecondary}>
              {requirementsComplete} completed requirement
              {requirementsComplete !== 1 ? 's' : ''}
            </Text>
          </Flex>
        </Box>
      </CardBody>
      <Divider borderColor={divderColor} />
      <CardFooter justify={'flex-end'} alignItems='center' flexWrap='wrap'>
        <Box flexGrow='1'>{completion}</Box>
        {requirementsComplete === props.certification?.requirementsCount ? (
          <Icon boxSize={8} as={RiCheckDoubleFill} color='green.500' />
        ) : (
          <Tooltip hasArrow label='Requirements' placement='top'>
            <NextLink
              href={
                '/certifications/completions?cert=' +
                props.certAddress +
                '&enrollee=' +
                enrollee.publicKey.toString()
              }
              passHref
            >
              <IconButton
                variant='outline'
                icon={<RiCheckboxCircleLine />}
                size='lg'
                aria-label='Requirements'
                mr={4}
                color={iconColor}
              />
            </NextLink>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  );
};
export default EnrolleeCard;
