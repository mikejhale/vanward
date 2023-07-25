import React, { useState, useEffect } from 'react';
import { Image, Box, Button, Stack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDropzone } from 'react-dropzone';
import { createGenericFileFromBrowserFile } from '@metaplex-foundation/umi';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage';
import { nftStorageUploadImage } from '../../utils/uploads';

const NftForm = (props: any) => {
  const [file, setFile] = useState(null);
  const wallet = useWallet();

  const handleSaveImage = async () => {
    const myUri = await nftStorageUploadImage(file, wallet);
    props.nftUri(myUri);
  };

  const handleCancel = async () => {
    setFile(null);
    props.addingNft(false);
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'image/*': [],
      },
      onDrop: (acceptedFiles) => {
        setFile(
          (acceptedFiles[0] = Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          }))
        );
      },
    });

  const preview = (
    <Box p={6}>
      <Image
        src={file?.preview}
        alt={file?.name}
        boxSize='xs'
        objectFit='contain'
        onLoad={() => {
          URL.revokeObjectURL(file?.preview);
        }}
      />
      <Stack mt={6} spacing={4} direction='row' align='center'>
        <Button onClick={handleCancel} variant='outline' colorScheme='navy'>
          Cancel
        </Button>
        <Button onClick={handleSaveImage} colorScheme='navy'>
          Save
        </Button>
      </Stack>
    </Box>
  );

  return (
    <Box mt={12}>
      <Box
        p={12}
        hidden={file}
        borderStyle='dashed'
        borderWidth='2px'
        borderRadius={12}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag image here, or click to select file</p>
        )}
      </Box>
      {file ? preview : null}
    </Box>
  );
};

export default NftForm;
