// Chakra imports
import { Flex } from '@chakra-ui/react';
import { VanwardLogo } from 'components/icons/Icons';

export function SidebarBrand() {
  return (
    <Flex alignItems='center' flexDirection='column'>
      <VanwardLogo />
    </Flex>
  );
}

export default SidebarBrand;
