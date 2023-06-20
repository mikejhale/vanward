import CertificationCard from './CertificationCard';
import { SimpleGrid } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';

const CertificationList = (props: any) => {
  const appCtx = useContext(AppContext);

  useEffect(() => {
    // get certifications from server
  }, []);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 2, '2xl': 3 }}
      gap='20px'
      mb='20px'
    >
      <CertificationCard title='Certification 1' id='Q4SOL2023' />
      <CertificationCard title='Certification 2' id='WBA23' />
      <CertificationCard title='Certification 3' id='PKHACK' />
    </SimpleGrid>
  );
};
export default CertificationList;
