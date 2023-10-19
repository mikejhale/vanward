// Chakra imports
import {
  Text,
  Button,
  Box,
  Flex,
  Icon,
  HStack,
  VStack,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AppContext } from '../../contexts/AppContext';
import Card from '../../components/card/Card';
import RequirementsList from 'components/requirements/RequirementsList';
import RequirementForm from 'components/requirements/RequirementForm';
import BackLink from 'components/nav/BackLink';
import { ProgramAccount } from '@coral-xyz/anchor';
import { useState, useEffect, useContext } from 'react';
import NextLink from 'next/link';

const Requirements: NextPage = () => {
  const [cert, setCert] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const router = useRouter();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const appCtx = useContext(AppContext);
  const certificationAddress = router.query.cert as string;

  useEffect(() => {
    const certification = appCtx.certifications.find((cert: ProgramAccount) => {
      return cert.publicKey.toString() === certificationAddress;
    });

    if (certification) {
      setCert(certification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificationAddress]);

  const handleAddRequirement = () => {
    setAddMode(true);
  };

  const closeForm = () => {
    setAddMode(false);
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <BackLink href='/certifications/list' text='Back to all certifications' />

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
          <RequirementsList certification={certificationAddress} />
          <Box hidden={!addMode}>
            <RequirementForm
              certification={certificationAddress}
              closeForm={closeForm}
            />
          </Box>
          <Button
            hidden={addMode}
            onClick={handleAddRequirement}
            mt={6}
            maxWidth={200}
            colorScheme='navy'
          >
            Add Requirement
          </Button>
        </Flex>
      </Card>
    </Box>
  );
};

export default Requirements;
