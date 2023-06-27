import { Flex, Spinner } from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
//import { Certification } from '../../types/certification';
import { getEnrollees } from '../../rpc/enrollees';
import { useQuery } from '@tanstack/react-query';

const EnrolleeList = (props: { certification: string }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { certification } = props;

  const { status, data, isFetching } = useQuery({
    queryKey: ['enrollees'],
    queryFn: () => getEnrollees(wallet, connection, certification),
  });

  return (
    <>
      <Flex wrap='wrap' alignItems='center' gap={4}>
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
        {status === 'success' && data.length === 0 && <div>No Enrollees</div>}
        {status === 'success' &&
          data.length > 0 &&
          data.map((enrollee: any) => (
            <div key={enrollee.publicKey.toString()}>
              {enrollee.publicKey.toString()}
            </div>
          ))}
      </Flex>
    </>
  );
};
export default EnrolleeList;
