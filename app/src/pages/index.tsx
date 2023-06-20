// Chakra imports
import {
  Text,
  Box,
  Flex,
  Select,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
// Assets
import MiniStatistics from 'components/card/MiniStatistics';
import type { NextPage } from 'next';
import IconBox from 'components/icons/IconBox';
import { MdBarChart } from 'react-icons/md';
import Card from '../components/card/Card';
import CertificationList from '../components/certification/CertificationList';

const Home: NextPage = () => {
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <CertificationList />
    </Box>
  );
};

export default Home;
