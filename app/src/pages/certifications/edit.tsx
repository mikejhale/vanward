// Chakra imports
import { Text, Box, Flex, useColorModeValue } from '@chakra-ui/react';
// Assets
import type { NextPage } from 'next';
import Card from '../../components/card/Card';
import { CertificationForm } from '../../components/certification/CertificationForm';

const CertificationEdit: NextPage = () => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

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
            Create Certification
          </Text>
        </Flex>
        <CertificationForm />
      </Card>
    </Box>
  );
};

export default CertificationEdit;
