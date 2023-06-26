// Chakra imports
import { Text, Button, Box, Flex, useColorModeValue } from '@chakra-ui/react';
// Assets
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AppContext } from '../../contexts/AppContext';
import Card from '../../components/card/Card';
import RequirementsList from 'components/requirements/RequirementsList';
import RequirementForm from 'components/requirements/RequirementForm';
import { useState, useEffect, useContext } from 'react';

const Requirements: NextPage = () => {
  const [cert, setCert] = useState(null);
  const [addMode, setAddMode] = useState(false);
  const router = useRouter();
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const appCtx = useContext(AppContext);
  const certificationAddress = router.query.cert as string;

  useEffect(() => {
    const certification = appCtx.certifications.find((cert) => {
      return cert.publicKey.toString() === certificationAddress;
    });

    if (certification) {
      setCert(certification);
    }
  }, [certificationAddress]);

  const handleAddRequirement = () => {
    setAddMode(true);
  };

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
          <RequirementsList certification={certificationAddress} />
          <Box hidden={!addMode}>
            <RequirementForm certification={certificationAddress} />
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
