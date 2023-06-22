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
import { HiUsers } from 'react-icons/hi';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { TiLockClosed } from 'react-icons/ti';
import { BsCheck2Circle } from 'react-icons/bs';
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
        pr={4}
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
              <Text color={textColor} fontSize='sm' maxW='40%'>
                {parseInt(certification.count)} Enrollees
              </Text>
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
          {certification.open ? (
            <Icon
              ml={2}
              color='green.500'
              boxSize={8}
              aria-label='Open'
              as={BsCheck2Circle}
              title='Enrollment is open'
            />
          ) : (
            <Icon
              ml={2}
              color='red.500'
              aria-label='closed'
              boxSize={8}
              as={TiLockClosed}
              title='Enrollment is closed'
            />
          )}
        </Box>
        <Tooltip hasArrow label='Manage Requirements' placement='top'>
          <NextLink href={'/add-requirements?cert=' + props.publickey} passHref>
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
          <NextLink href={'/add-requirements?cert=' + props.publickey} passHref>
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
