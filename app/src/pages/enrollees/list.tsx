// Chakra imports
import { Text, Box, Flex, useColorModeValue } from '@chakra-ui/react';
// Assets
import type { NextPage } from 'next';
import Card from '../../components/card/Card';

const Enrollees: NextPage = () => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Card mb='20px'>
        <Flex align='center' w='100%' justify='space-between' mb='30px'>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mb='4px'
          >
            Notifications
          </Text>
        </Flex>
      </Card>
    </Box>
  );
};

export default Enrollees;
