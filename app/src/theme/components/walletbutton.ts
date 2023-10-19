import { mode } from '@chakra-ui/theme-tools';

export const walletButtonStyles = {
  components: {
    WalletButton: {
      baseStyle: (props: any) => ({
        backgroundColor: mode('#422AFB', '#7551FF')(props),
        transition: '.25s all ease',
        borderRadius: '16px',
        boxSizing: 'border-box',
        _hover: {
          bg: mode('red', 'green')(props),
        },
      }),
    },
  },
};
