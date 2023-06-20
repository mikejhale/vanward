import { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useStyleConfig, defineStyleConfig } from '@chakra-ui/react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// const WalletMultiButtonDynamic = dynamic(
//   async () =>
//     (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
//   { ssr: false }
// );

export const WalletButton: FC = () => {
  const styles = useStyleConfig('WalletButton');
  const [buttonStyles, setButtonStyles] = useState({});

  useEffect(() => {
    console.log(styles);
    setButtonStyles(styles);
  }, [styles]);

  return <WalletMultiButton style={buttonStyles} />;
};
