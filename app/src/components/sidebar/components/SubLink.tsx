import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';

export function SubLink(props: {
  href: string;
  hidden: boolean;
  label: string;
  queryString?: string;
  icon: any;
  group: string;
}) {
  const router = useRouter();
  let activeColor = useColorModeValue('gray.700', 'white');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let textColor = useColorModeValue('secondaryGray.500', 'secondaryGray.500');

  const activeRoute = (route: string) => {
    return router.route === route;
  };

  return (
    <NextLink href={props.href + props.queryString} hidden={props.hidden}>
      <Box>
        <HStack
          spacing={activeRoute(props.href) ? '22px' : '26px'}
          py='5px'
          ps='24px'
          fontSize='sm'
        >
          <Flex w='100%' alignItems='center' justifyContent='center'>
            <Box
              color={activeRoute(props.href) ? activeIcon : textColor}
              me='18px'
            >
              {props.icon}
            </Box>
            <Text
              me='auto'
              color={activeRoute(props.href) ? activeColor : textColor}
              fontWeight={activeRoute(props.href) ? 'bold' : 'normal'}
            >
              {props.label}
            </Text>
          </Flex>
        </HStack>
      </Box>
    </NextLink>
  );
}
