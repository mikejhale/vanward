// Chakra Imports
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
// Custom Components
//import { ItemContent } from 'components/menu/ItemContent';
//import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
// Assets
import { MdNotificationsNone } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import { FaEthereum } from 'react-icons/fa';
import { WalletButton } from '../wallet/WalletButton';

export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.400', 'white');
  let menuBg = useColorModeValue('white', 'navy.800');
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorBrand = useColorModeValue('brand.700', 'brand.400');
  const ethColor = useColorModeValue('gray.700', 'white');
  const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const ethBox = useColorModeValue('white', 'navy.800');
  const shadow = useColorModeValue(
    '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
    '14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
  );

  return (
    <Flex
      w={{ sm: '100%', md: 'auto' }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
      p='10px'
      borderRadius='30px'
      boxShadow={shadow}
    >
      <Flex
        bg={ethBg}
        display={secondary ? 'flex' : 'none'}
        borderRadius='30px'
        ms='auto'
        p='6px'
        align='center'
        me='6px'
      >
        <Flex
          align='center'
          justify='center'
          bg={ethBox}
          h='29px'
          w='29px'
          borderRadius='30px'
          me='7px'
        >
          <Icon color={ethColor} w='9px' h='14px' as={FaEthereum} />
        </Flex>
        <Text
          w='max-content'
          color={ethColor}
          fontSize='sm'
          fontWeight='700'
          me='6px'
        >
          1,924
          <Text as='span' display={{ base: 'none', md: 'unset' }}>
            {' '}
            ETH
          </Text>
        </Text>
      </Flex>
      <SidebarResponsive />
      <Menu>
        <MenuButton p='0px'>
          <Icon
            mt='6px'
            as={MdNotificationsNone}
            color={navbarIcon}
            w='18px'
            h='18px'
            me='10px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='20px'
          borderRadius='20px'
          bg={menuBg}
          border='none'
          mt='22px'
          me={{ base: '30px', md: 'unset' }}
          minW={{ base: 'unset', md: '400px', xl: '450px' }}
          maxW={{ base: '360px', md: 'unset' }}
        >
          <Flex w='100%' mb='20px'>
            <Text fontSize='md' fontWeight='600' color={textColor}>
              Notifications
            </Text>
            <Text
              fontSize='sm'
              fontWeight='500'
              color={textColorBrand}
              ms='auto'
              cursor='pointer'
            >
              Mark all read
            </Text>
          </Flex>
        </MenuList>
      </Menu>

      <Button
        variant='no-hover'
        bg='transparent'
        p='0px'
        minW='unset'
        minH='unset'
        h='18px'
        w='max-content'
        onClick={toggleColorMode}
      >
        <Icon
          me='10px'
          h='18px'
          w='18px'
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <WalletButton />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
