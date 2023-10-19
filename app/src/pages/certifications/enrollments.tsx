// Chakra imports
import { Box } from '@chakra-ui/react';
// Assets
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AppContext } from '../../contexts/AppContext';
import EnrolleeList from 'components/enrollees/EnrolleeList';
import { ProgramAccount } from '@coral-xyz/anchor';
import { useState, useEffect, useContext } from 'react';
import BackLink from 'components/nav/BackLink';

const Enrollments: NextPage = () => {
  const [cert, setCert] = useState(null);
  const router = useRouter();
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

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <BackLink href='/certifications/list' text='Back to all certifications' />

      <EnrolleeList certification={certificationAddress} />
    </Box>
  );
};

export default Enrollments;
