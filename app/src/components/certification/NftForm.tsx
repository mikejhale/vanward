import React, { useState, useEffect } from 'react';
import { Image, Box, Button } from '@chakra-ui/react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useDropzone } from 'react-dropzone';
import { createGenericFileFromBrowserFile } from '@metaplex-foundation/umi';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage';

const NftForm = (props: any) => {
  const [file, setFile] = useState(null);
  const wallet = useWallet();
  const { connection } = useConnection();

  const handleSaveImage = async () => {
    console.log('file', file);
    const imageFile = await createGenericFileFromBrowserFile(file, {
      displayName: file.name,
      uniqueName: file.name,
      contentType: file.type,
      extension: file.name.split('.').pop(),
    });
    console.log('imageFile', imageFile);

    const umi = createUmi('https://api.devnet.solana.com')
      .use(
        nftStorageUploader({
          token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
        })
      )
      .use(walletAdapterIdentity(wallet));

    const [myUri] = await umi.uploader.upload([imageFile], {
      onProgress: (percent) => {
        console.log(`${percent * 100}% uploaded...`);
      },
    });

    console.log('file uri:', myUri);

    // const bundlr = new WebBundlr(
    //   'https://node1.bundlr.network',
    //   'solana',
    //   wallet
    // );
    // await bundlr.ready();

    // const mplx = Metaplex.make(connection, { cluster: 'devnet' })
    //   .use(walletAdapterIdentity(wallet))
    //   .use(
    //     bundlrStorage({
    //       address: 'https://devnet.bundlr.network',
    //       providerUrl: 'https://api.devnet.solana.com',
    //       timeout: 60000,
    //     })
    //   );

    // const mplxFile = toMetaplexFile(file, file.name);
    // const imgUri = await mplx.storage().upload(mplxFile);

    // console.log('imgUri', imgUri);
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
    <Box>
      <Image
        src={file?.preview}
        alt={file?.name}
        boxSize='xs'
        objectFit='contain'
        onLoad={() => {
          URL.revokeObjectURL(file?.preview);
        }}
      />
      <Button onClick={handleSaveImage}>Save</Button>
    </Box>
  );

  useEffect(() => {
    console.log(acceptedFiles);
  }, [acceptedFiles]);

  return (
    <Box>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      {file ? preview : null}
    </Box>
  );
};

export default NftForm;
