import { useEffect } from 'react';
import {
  Text,
  Card,
  Button,
  CardBody,
  CardHeader,
  Flex,
  Box,
  Icon,
  Heading,
  IconButton,
  CardFooter,
  Divider,
  useToast,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import { shortAddress } from 'utils/address';
import { countBitsSet } from 'utils/numbers';
import NextLink from 'next/link';
import {
  RiCheckboxCircleLine,
  RiFileCopy2Line,
  RiCheckDoubleFill,
} from 'react-icons/ri';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../../rpc/program';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import metadata from '../../assets/json/metadata.js';
import { nftStorageUploadMetadata } from '../../utils/uploads';
import { mintNft } from '../../utils/nft';

const EnrolleeCard = (props: any) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = useColorModeValue('secondaryGray.700', 'Gray.200');
  const iconColor = useColorModeValue('brand.500', 'gray.200');
  const cardColor = useColorModeValue('white', 'navy.800');
  const divderColor = useColorModeValue(
    'secondaryGray.200',
    'secondaryGray.700'
  );
  const [value, copy] = useCopyToClipboard();
  const toast = useToast();
  const enrollee = props.enrollee;
  const wallet = useWallet();
  const { connection } = useConnection();
  const program = getProgram(wallet, connection);

  useEffect(() => {
    if (value) {
      toast({
        title: 'Copied Address',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const requirementsComplete = countBitsSet(
    enrollee.account.completedRequirements
  );

  let completion = null;
  if (enrollee.account.complete) {
    // format timestamp as YYYY-MM-DD
    const date = new Date(enrollee.account.completedDate * 1000);
    const formattedDate = date.toLocaleDateString();

    completion = <Text>Completion Date: {formattedDate}</Text>;
  }

  const handleMintNft = async () => {
    console.log('minting nft');

    var date = new Date();

    // Get year, month, and day part from the date
    var year = date.toLocaleString('default', { year: 'numeric' });
    var month = date.toLocaleString('default', { month: '2-digit' });
    var day = date.toLocaleString('default', { day: '2-digit' });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + '-' + month + '-' + day;

    metadata.name = props.certification?.title;
    metadata.image = props.certification?.nftUri;
    metadata.attributes[0].value = props.certification?.id;
    metadata.attributes[1].value = formattedDate;
    metadata.attributes[2].value = enrollee.account.owner.toString();
    metadata.properties.files[0].uri = props.certification?.nftUri;
    metadata.properties.files[0].type =
      'image/' + props.certification?.nftUri.split('.').pop();
    metadata.properties.creators[0].address = wallet.publicKey.toString();

    //const metadataUri = await nftStorageUploadMetadata(metadata, wallet);
    const metadataUri =
      'https://bafkreibq2d62lzmh5tylv32jh6drxkg55gqsh6sg3nmnza2vdymiq5voky.ipfs.nftstorage.link/';

    console.log(enrollee.account.owner.toString());
    const mintTx = await mintNft(
      wallet,
      program,
      props.certification?.title,
      metadataUri,
      enrollee.account.owner
    );
  };

  return (
    <Card
      maxW='md'
      display='flex'
      flexDirection='column'
      width='100%'
      position='relative'
      borderRadius='20px'
      minWidth='0px'
      bg={cardColor}
      backgroundClip='border-box'
    >
      <CardHeader p={8} pb={2}>
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
          <Heading size={'md'} mb={2} color={textColor}>
            {shortAddress(enrollee.account.owner.toString())}
          </Heading>
          <Tooltip hasArrow label='Copy address' placement='top'>
            <IconButton
              flexGrow={1}
              justifyContent='flex-start'
              aria-label='Copy address'
              variant='link'
              icon={<RiFileCopy2Line />}
              onClick={() => copy(enrollee.account.owner.toString())}
            />
          </Tooltip>
        </Flex>
      </CardHeader>
      <CardBody
        mt={0}
        ml={4}
        mb={3}
        pt={1}
        pl={4}
        pr={8}
        pb={1}
        display='flex'
        flexDirection='column'
      >
        <Box w='100%' mt='auto'>
          <Flex w='100%' justify='space-between' mb='10px'>
            <Text color={textColorSecondary}>
              {requirementsComplete}/{props.certification?.requirementsCount}{' '}
              completed requirements
            </Text>
          </Flex>
          <Button
            hidden={
              requirementsComplete !== props.certification?.requirementsCount ||
              !props.certification?.nftUri?.startsWith('http')
            }
            colorScheme='navy'
            onClick={handleMintNft}
          >
            Issue NFT
          </Button>
        </Box>
      </CardBody>
      <Divider borderColor={divderColor} />
      <CardFooter justify={'flex-end'} alignItems='center' flexWrap='wrap'>
        <Box flexGrow='1'>{completion}</Box>
        {requirementsComplete === props.certification?.requirementsCount ? (
          <Icon boxSize={8} as={RiCheckDoubleFill} color='green.500' />
        ) : (
          <Tooltip hasArrow label='Requirements' placement='top'>
            <NextLink
              href={
                '/certifications/completions?cert=' +
                props.certAddress +
                '&enrollee=' +
                enrollee.publicKey.toString()
              }
              passHref
            >
              <IconButton
                variant='outline'
                icon={<RiCheckboxCircleLine />}
                size='lg'
                aria-label='Requirements'
                mr={4}
                color={iconColor}
              />
            </NextLink>
          </Tooltip>
        )}
      </CardFooter>
    </Card>
  );
};
export default EnrolleeCard;
