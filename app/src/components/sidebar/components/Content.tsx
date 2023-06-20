// chakra imports
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
//   Custom components
import Brand from 'components/sidebar/components/Brand';
import { SidebarLink } from './SidebarLink';
import { TbAwardFilled } from 'react-icons/tb';
import { HiUsers } from 'react-icons/hi';

// FUNCTIONS

function SidebarContent() {
	// SIDEBAR
	return (
		<Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
			<Brand />
			<Stack direction='column' mt='8px' mb='auto'>
				<Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
					<SidebarLink href="/" label="Certifications" icon={<TbAwardFilled />} />
					<SidebarLink href="/enrollees" label="Enrollees" icon={<HiUsers />} />
				</Box>
			</Stack>

			<Box ps='20px' pe={{ lg: '16px', '2xl': '20px' }} mt='60px' mb='40px' borderRadius='30px'>
				<Text>Settings</Text>
			</Box>
		</Flex>
	);
}

export default SidebarContent;
