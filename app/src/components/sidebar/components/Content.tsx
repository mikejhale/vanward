// chakra imports
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Brand from 'components/sidebar/components/Brand';
import { SidebarLink } from './SidebarLink';
import { SubLink } from './SubLink';
import { TbAwardFilled } from 'react-icons/tb';
import { HiUsers } from 'react-icons/hi';
import { MdFormatListBulletedAdd } from 'react-icons/md';

// FUNCTIONS

function SidebarContent() {
  const router = useRouter();
  const hasCert = router.query.cert ? true : false;

  return (
    <Flex direction='column' height='100%' pt='25px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mt='8px' mb='auto'>
        <Box ps='20px' pe={{ lg: '16px', '2xl': '16px' }}>
          <SidebarLink
            href='/certifications/list'
            group='certifications'
            label='Certifications'
            icon={<TbAwardFilled />}
          />
          <SubLink
            hidden={!hasCert}
            href='/certifications/reqs'
            group='certifications'
            label='Requirements'
            queryString={'?cert=' + router.query.cert}
            icon={<MdFormatListBulletedAdd />}
          />
          <SubLink
            hidden={!hasCert}
            href='/certifications/enrollments'
            group='certifications'
            label='Enrollments'
            queryString={'?cert=' + router.query.cert}
            icon={<HiUsers />}
          />
          <SidebarLink
            href='/enrollees/list'
            group='enrollees'
            label='Enrollees'
            icon={<HiUsers />}
          />
        </Box>
      </Stack>

      <Box
        ps='20px'
        pe={{ lg: '16px', '2xl': '20px' }}
        mt='60px'
        mb='40px'
        borderRadius='30px'
      >
        <Text>Settings</Text>
      </Box>
    </Flex>
  );
}

export default SidebarContent;
