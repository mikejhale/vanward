import CertificationCard from './CertificationCard';
import {
  Flex,
  IconButton,
  Spinner,
  Button,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
//import { useState } from 'react';
//import { ProgramAccount } from '@coral-xyz/anchor';
//import { AppContext } from '../../contexts/AppContext';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
//import { Certification } from '../../types/certification';
import NextLink from 'next/link';
import { getCertifications } from '../../rpc/certifications';
import { useQuery } from '@tanstack/react-query';
import { MdOutlineRefresh } from 'react-icons/md';
import { HiOutlineDocumentAdd } from 'react-icons/hi';

const CertificationList = (props: any) => {
  // const [certifications, setCertifications] = useState<
  //   ProgramAccount<Certification>[]
  // >([]);
  const { connection } = useConnection();
  const wallet = useWallet();
  //const appCtx = useContext(AppContext);

  const buttonBgColor = useColorModeValue('brand.500', 'brand.400');
  const buttonHoverColor = useColorModeValue('brand.400', 'brand.500');
  const buttonColor = useColorModeValue('secondaryGray.100', 'brand.500');

  const { status, data, refetch, error, isFetching } = useQuery({
    queryKey: ['certifications'],
    queryFn: () => getCertifications(wallet, connection),
  });

  return (
    <>
      <Flex mb={4}>
        <NextLink href={'/certifications/edit?cert=0'} passHref>
          <Button
            colorScheme='navy'
            //bgColor={buttonBgColor}
            //_hover={{ bgColor: buttonHoverColor }}
            leftIcon={<HiOutlineDocumentAdd />}
          >
            New Certification
          </Button>
        </NextLink>
        <Tooltip hasArrow label='Refresh' placement='auto'>
          <IconButton
            aria-label='refresh'
            icon={<MdOutlineRefresh />}
            ml={2}
            onClick={() => refetch()}
            isDisabled={isFetching}
          />
        </Tooltip>
      </Flex>
      <Flex wrap='wrap' alignItems='center' gap={4}>
        {console.log(error)}
        {status === 'error' && <div>Could not get Certifications</div>}
        {isFetching && (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='brand.500'
            size='xl'
          />
        )}
        {status === 'success' && data.length === 0 && (
          <div>No Certifications</div>
        )}
        {status === 'success' &&
          data.length > 0 &&
          data.map((cert: any) => (
            <CertificationCard
              key={cert.publicKey.toString()}
              publickey={cert.publicKey.toString()}
              certification={cert.account}
            />
          ))}
      </Flex>
    </>
  );
};
export default CertificationList;
