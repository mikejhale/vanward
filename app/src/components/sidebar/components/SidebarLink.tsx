import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';

export function SidebarLink(props: { href: string; label: string; icon: any }) {
  const router = useRouter();
  let activeColor = useColorModeValue('gray.700', 'white');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'white');
  let brandColor = useColorModeValue('brand.500', 'brand.400');

  const activeRoute = (route: string) => {
    return router.route === route;
  };

  return (
    <NextLink href={props.href}>
      <Box>
        <HStack
          spacing={activeRoute(props.href.toLowerCase()) ? '22px' : '26px'}
          py='5px'
          ps='10px'
        >
          <Flex w='100%' alignItems='center' justifyContent='center'>
            <Box
              color={
                activeRoute(props.href.toLowerCase()) ? activeIcon : textColor
              }
              me='18px'
            >
              {props.icon}
            </Box>
            <Text
              me='auto'
              color={
                activeRoute(props.href.toLowerCase()) ? activeColor : textColor
              }
              fontWeight={
                activeRoute(props.href.toLowerCase()) ? 'bold' : 'normal'
              }
            >
              {props.label}
            </Text>
          </Flex>
          <Box
            h='36px'
            w='4px'
            bg={
              activeRoute(props.href.toLowerCase()) ? brandColor : 'transparent'
            }
            borderRadius='5px'
          />
        </HStack>
      </Box>
    </NextLink>
  );
}
