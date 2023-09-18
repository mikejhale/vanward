import { Link, Flex, Icon } from '@chakra-ui/react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import NextLink from 'next/link';

const EnrolleeCard = (props: any) => {
  return (
    <Link as={NextLink} href={props.href}>
      <Flex alignItems='center' mb={2} direction='row'>
        <Icon as={IoMdArrowRoundBack} mr={2} />
        {props.text}
      </Flex>
    </Link>
  );
};

export default EnrolleeCard;
