import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getRequirements } from '../../rpc/requirements';

// Custom components
import Card from 'components/card/Card';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// Assets

type RowObj = {
  module: string;
  credits: number;
};

const columnHelper = createColumnHelper<RowObj>();

const RequirementsList = (props: { certification: string }) => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { certification } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [reqData, setReqData] = useState([]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const iconColor = useColorModeValue('secondaryGray.500', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

  console.log('RL: certification', certification);

  const { status, data, refetch, error, isLoading } = useQuery({
    queryKey: ['requirements'],
    queryFn: () => getRequirements(wallet, connection, certification),
  });

  useEffect(() => {
    console.log('req data', data);
    const reqs = data?.map((req) => {
      return {
        module: req.account.module,
        credits: req.account.credits,
      };
    });

    setReqData(reqs);
  }, [data]);

  const columns = [
    columnHelper.accessor('module', {
      id: 'module',
      header: () => (
        <Text
          justifyContent='space-between'
          fontSize='lg'
          align='center'
          color={textColor}
        >
          MODULE
        </Text>
      ),
      cell: (info: any) => (
        <Flex align='center'>
          <Text fontSize='md' color={textColor}>
            {info.getValue()}
          </Text>
        </Flex>
      ),
    }),

    columnHelper.accessor('credits', {
      id: 'credits',
      header: () => (
        <Text
          justifyContent='space-between'
          fontSize='lg'
          align='center'
          color={textColor}
        >
          CREDITS
        </Text>
      ),
      cell: (info) => (
        <Text fontSize='md' color={textColor}>
          {info.getValue()}
        </Text>
      ),
    }),
  ];
  //const [data, setData] = useState(tableData);
  const table = useReactTable({
    data: reqData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  console.log('req data', reqData);

  return reqData.length > 0 ? (
    <Card
      flexDirection='column'
      w='100%'
      px='0px'
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Box>
        <Table variant='simple' color='gray.500' mb='24px' mt='12px'>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      key={header.id}
                      colSpan={header.colSpan}
                      pe='10px'
                      borderColor={borderColor}
                      cursor='pointer'
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <Flex
                        justifyContent='space-between'
                        align='center'
                        color='gray.400'
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: '',
                          desc: '',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Flex>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table
              .getRowModel()
              .rows.slice(0, 11)
              .map((row) => {
                return (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <Td
                          key={cell.id}
                          minW={{ sm: '150px', md: '200px', lg: 'auto' }}
                          borderColor='transparent'
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </Td>
                      );
                    })}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </Box>
    </Card>
  ) : (
    <Text>No requirements found</Text>
  );
};

export default dynamic(() => Promise.resolve(RequirementsList), {
  ssr: false,
});
