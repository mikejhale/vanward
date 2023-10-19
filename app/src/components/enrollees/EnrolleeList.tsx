import { Flex, Spinner } from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getEnrollees } from '../../rpc/enrollees';
import { useQuery } from '@tanstack/react-query';
import EnrolleeCard from './EnrolleeCard';
import { getCertification } from 'rpc/certifications';

const EnrolleeList = (props: { certification: string }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { certification } = props;

  const { status, data, isFetching } = useQuery({
    queryKey: ['enrollees'],
    queryFn: () => getEnrollees(wallet, connection, certification),
  });

  const { data: certData } = useQuery({
    queryKey: ['certification'],
    queryFn: () => getCertification(wallet, connection, certification),
  });

  return (
    <>
      <Flex wrap='wrap' alignItems='center' gap={4}>
        {status === 'error' && <div>Could not get Enrollees</div>}
        {isFetching && (
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='brand.500'
            size='xl'
          />
        )}
        {status === 'success' && data.length === 0 && <div>No Enrollees</div>}
        {status === 'success' &&
          data.length > 0 &&
          data.map((enrollee: any) => (
            <EnrolleeCard
              key={enrollee.publicKey.toString()}
              enrollee={enrollee}
              certification={certData}
              certAddress={certification}
            />
          ))}
      </Flex>
    </>
  );
};
export default EnrolleeList;
