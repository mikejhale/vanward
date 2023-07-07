// Chakra imports
import { Text, Button, Box, Flex, useColorModeValue } from '@chakra-ui/react';
// Assets
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AppContext } from '../../contexts/AppContext';
import Card from '../../components/card/Card';
import { shortAddress } from '../../utils/address';
import CompletionsList from 'components/requirements/CompletionsList';
import { ProgramAccount } from '@coral-xyz/anchor';
import { useState, useEffect, useContext } from 'react';

const Completions: NextPage = () => {
  const [cert, setCert] = useState(null);
  const router = useRouter();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const appCtx = useContext(AppContext);
  const certificationAddress = router.query.cert as string;
  const enrollmentAddress = router.query.enrollee as string;

  useEffect(() => {
    const certification = appCtx.certifications.find((cert: ProgramAccount) => {
      return cert.publicKey.toString() === certificationAddress;
    });

    if (certification) {
      setCert(certification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificationAddress]);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Card mb='20px'>
        <Flex direction='column' w='100%' justify='space-between' mb='30px'>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            fontSize='2xl'
            mb={4}
          >
            {cert?.account.title}
          </Text>
          <Text color={textColorPrimary} fontSize='lg' mb={4}>
            {shortAddress(enrollmentAddress)}
          </Text>
          <CompletionsList
            certification={certificationAddress}
            enrollment={enrollmentAddress}
          />
        </Flex>
      </Card>
    </Box>
  );
};

export default Completions;
