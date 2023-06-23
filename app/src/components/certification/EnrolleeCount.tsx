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
  const enrolleeCount: number = isNaN(props.count) ? 0 : props.count;

  return (
    <Box w='100%' mt='auto'>
      <Flex w='100%' justify='space-between' mb='10px'>
        <Text color={textColor} fontSize='sm' maxW='40%'>
          {enrolleeCount.toString()} Enrollees
        </Text>
        <Text color={textColor} fontSize='sm' maxW='40%'>
          MAX {props.max}
        </Text>
      </Flex>
      <Progress
        aria-valuenow={props.count}
        alignItems='start'
        colorScheme='brandScheme'
        value={(enrolleeCount / props.max) * 100}
        w='100%'
      />
    </Box>
  );
};

export default EnrolleeCount;
