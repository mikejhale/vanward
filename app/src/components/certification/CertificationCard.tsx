import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Box,
  Heading,
  IconButton,
  Progress,
  CardFooter,
  useColorModeValue,
} from '@chakra-ui/react';
import EnrolleeCount from './EnrolleeCount';
import { HiUsers } from 'react-icons/hi';
import { MdFormatListBulletedAdd } from 'react-icons/md';

const CertificationCard = (props: any) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'secondaryGray.600';
  const cardColor = useColorModeValue('white', 'navy.800');

  return (
    <Card
      maxW='md'
      p='20px'
      display='flex'
      flexDirection='column'
      width='100%'
      position='relative'
      borderRadius='20px'
      minWidth='0px'
      bg={cardColor}
      backgroundClip='border-box'
    >
      <CardHeader>
        <Flex>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box>
              <Heading color={textColor}>{props.title}</Heading>
              <Text color={textColorSecondary}>{props.id}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <EnrolleeCount count={64} max={100} />
      </CardBody>

      <CardFooter justify={'flex-end'} flexWrap='wrap'>
        <IconButton
          variant='outline'
          icon={<MdFormatListBulletedAdd />}
          size='lg'
          aria-label='Add Requirement'
          title='Add Requirement'
          mr={4}
          color={useColorModeValue('brand.500', 'gray.200')}
        />
        <IconButton
          variant='outline'
          icon={<HiUsers />}
          size='lg'
          aria-label='Enrollees'
          title='Enrollees'
          mr={4}
          color={useColorModeValue('brand.500', 'gray.200')}
        />
      </CardFooter>
    </Card>
  );
};
export default CertificationCard;
