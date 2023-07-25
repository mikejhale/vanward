import {
  createGenericFileFromBrowserFile,
  createGenericFileFromJson,
} from '@metaplex-foundation/umi';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage';

export const nftStorageUploadImage = async (file: any, wallet: any) => {
  const imageFile = await createGenericFileFromBrowserFile(file, {
    displayName: file.name,
    uniqueName: file.name,
    contentType: file.type,
    extension: file.name.split('.').pop(),
  });

  return nftStorageUpload(imageFile, wallet);
};

export const nftStorageUploadMetadata = async (json: any, wallet: any) => {
  console.log(json);

  const jsonFile = await createGenericFileFromJson(json, 'metadata.json', {
    displayName: 'metadata.json',
    uniqueName: 'metadata.json',
    contentType: 'text/json',
    extension: 'json',
  });

  console.log('jsonFile', jsonFile);

  return nftStorageUpload(jsonFile, wallet);
};

const nftStorageUpload = async (file: any, wallet: any) => {
  const umi = createUmi('https://api.devnet.solana.com')
    .use(
      nftStorageUploader({
        token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN,
      })
    )
    .use(walletAdapterIdentity(wallet));

  const [fileUri] = await umi.uploader.upload([file], {
    onProgress: (percent) => {
      console.log(`${percent * 100}% uploaded...`);
    },
  });

  console.log('fileUri', fileUri);

  return fileUri;
};
