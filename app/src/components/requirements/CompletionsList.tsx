import {
  Box,
  Flex,
  Text,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getRequirements, completeRequirement } from '../../rpc/requirements';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { getEnrollment } from '../../rpc/enrollees';
import { isBitSet } from '../../utils/numbers';
import Card from 'components/card/Card';
import { useQuery } from '@tanstack/react-query';
import { RiCheckboxCircleLine, RiCheckLine } from 'react-icons/ri';

const CompletionsList = (props: {
  certification: string;
  enrollment: string;
}) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { certification } = props;
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { mutate } = useMutation({
    mutationFn: completeRequirement,
    onSuccess: (data) => {
      console.log('success', data);
    },
  });

  const { data, isFetching } = useQuery({
    queryKey: ['requirements'],
    queryFn: () => getRequirements(wallet, connection, certification),
  });

  const { data: enrollmentData, isFetching: enrollmentIsFetching } = useQuery({
    queryKey: ['enrollment'],
    queryFn: () => getEnrollment(wallet, connection, props.enrollment) as any,
  });

  const setComplete = (req: string) => {
    console.log('set complete', req);
    mutate({
      wallet,
      connection,
      certification,
      enrollment: props.enrollment,
      requirement: req,
    });
  };

  if (!isFetching && data) {
    data.sort((a: any, b: any) => (a.account.order > b.account.order ? 1 : -1));
  }

  return (
    <Card
      flexDirection='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Box>
        {data?.map((req: any) => {
          return (
            <Flex
              key={req.account.module}
              w='100%'
              align='center'
              justify='space-between'
              borderBottom='1px solid'
              borderColor={textColor}
              py='10px'
            >
              <Text>{req.account.module}</Text>
              <Text>
                {isBitSet(
                  req.account.order,
                  enrollmentData?.completedRequirements.toNumber()
                ) ? (
                  <Icon as={RiCheckboxCircleLine} color='green.500' />
                ) : (
                  <Button
                    variant='solid'
                    flexGrow='1'
                    maxWidth={160}
                    colorScheme='navy'
                    leftIcon={<RiCheckLine />}
                    onClick={() => {
                      setComplete(req.publicKey.toString());
                    }}
                  >
                    Set Complete
                  </Button>
                )}
              </Text>
            </Flex>
          );
        })}
      </Box>
    </Card>
  );
};

export default CompletionsList;
