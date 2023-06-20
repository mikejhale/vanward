// Chakra imports
import { Text, Box, Flex, Select, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
// Assets
import MiniStatistics from 'components/card/MiniStatistics';
import type { NextPage } from 'next';
import IconBox from 'components/icons/IconBox';
import { MdBarChart } from 'react-icons/md';
import Card from '../components/card/Card';
import CertificationList from '../components/certification/CertificationList';


const Enrollees: NextPage = () => {
    const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');

	// Chakra Color Mode
	const brandColor = useColorModeValue('brand.500', 'white');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Card mb='20px'>
			<Flex align='center' w='100%' justify='space-between' mb='30px'>
				<Text color={textColorPrimary} fontWeight='bold' fontSize='2xl' mb='4px'>
					Notifications
				</Text>

			</Flex>
            <CertificationList />
			</Card>


		</Box>
	);
}

export default Enrollees;