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

type EnrolleeCountProps = {
  count: number;
  max: number;
};

const EnrolleeCount = (props: EnrolleeCountProps) => {
  const textColorSecondary = 'secondaryGray.600';
  const textColor = useColorModeValue('secondaryGray.800', 'white');

  return (
    <Box w='100%' mt='auto'>
      <Flex w='100%' justify='space-between' mb='10px'>
        <Text color={textColor} fontSize='sm' maxW='40%'>
          {props.count} Enrollees
        </Text>
        <Text color={textColor} fontSize='sm' maxW='40%'>
          MAX {props.max}
        </Text>
      </Flex>
      <Progress
        aria-valuenow={props.count}
        alignItems='start'
        colorScheme='brandScheme'
        value={(props.count / props.max) * 100}
        w='100%'
      />
    </Box>
  );
};

export default EnrolleeCount;
