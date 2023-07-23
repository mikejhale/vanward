import * as anchor from '@coral-xyz/anchor';
import { Program, Wallet } from '@coral-xyz/anchor';
import { Vanward } from '../target/types/vanward';
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  MINT_SIZE,
} from '@solana/spl-token'; // IGNORE THESE ERRORS IF ANY
const { SystemProgram } = anchor.web3;
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { mockStorage } from '@metaplex-foundation/umi-storage-mock';
import * as fs from 'fs';
import {
  createGenericFile,
  generateSigner,
  keypairIdentity,
  createSignerFromKeypair,
  createGenericFileFromJson,
} from '@metaplex-foundation/umi';
import {
  publicKey,
  signerIdentity,
  KeypairSigner,
} from '@metaplex-foundation/umi';
import { bundlrUploader } from '@metaplex-foundation/umi-uploader-bundlr';

describe('mint-nft', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  const wallet = provider.wallet as Wallet;
  anchor.setProvider(provider);
  const program = anchor.workspace.Vanward as Program<Vanward>;

  const decodedKey = new Uint8Array(
    JSON.parse(
      //replace with actual path from home dir. For example '.config/solana/devnet.json'
      fs
        .readFileSync('/home/mike/.config/solana/dev-phantom.json', 'utf-8')
        .toString()
    )
  ).slice(0, 32);

  const umi = createUmi('https://api.devnet.solana.com');
  const myKeypair = umi.eddsa.createKeypairFromSeed(decodedKey);
  umi.use(keypairIdentity(myKeypair));

  umi.use(
    bundlrUploader({
      // @ts-ignore
      payer: myKeypair,
    })
  );

  const recipient = new anchor.web3.PublicKey(
    'GcZU2zhzy8CQ9XUZDnMCzFrepgxmKfWDLY4tGUtpaWiN'
  );

  it('can store NFT metadata', async () => {
    console.log(
      'pre-balance: ',
      await provider.connection.getBalance(
        new anchor.web3.PublicKey(myKeypair.publicKey.toString())
      )
    );
    const metadaraUri =
      'https://bafkreib5t4ekjpzzimyiwclaovwdeacriay5ugq4zo6w64ckzus5e55hx4.ipfs.nftstorage.link/';

    const fl = fs.readFileSync(
      '/home/mike/dev/src/vanward/tests/assets/nas.png'
    );
    const file = createGenericFile(fl, 'nas.png', {
      displayName: 'nas.png',
      uniqueName: 'nas.png',
      contentType: 'image/png',
      extension: 'png',
      tags: [{ name: 'image', value: 'nas' }],
    });

    console.log('uploading...');
    const [myUri] = await umi.uploader.upload([file], {
      onProgress: (percent) => {
        console.log(`${percent * 100}% uploaded...`);
      },
    });

    console.log(
      'post-balance: ',
      await provider.connection.getBalance(
        new anchor.web3.PublicKey(myKeypair.publicKey.toString())
      )
    );

    console.log('File URI: ', myUri);
  });
  /*
  it('can mint NFT', async () => {
    // Add your test here.

    const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey(
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    );
    const lamports: number =
      await program.provider.connection.getMinimumBalanceForRentExemption(
        MINT_SIZE
      );
    const getMetadata = async (
      mint: anchor.web3.PublicKey
    ): Promise<anchor.web3.PublicKey> => {
      return (
        await anchor.web3.PublicKey.findProgramAddress(
          [
            Buffer.from('metadata'),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];
    };

    const getMasterEdition = async (
      mint: anchor.web3.PublicKey
    ): Promise<anchor.web3.PublicKey> => {
      return (
        await anchor.web3.PublicKey.findProgramAddress(
          [
            Buffer.from('metadata'),
            TOKEN_METADATA_PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from('edition'),
          ],
          TOKEN_METADATA_PROGRAM_ID
        )
      )[0];
    };

    const mintKey: anchor.web3.Keypair = anchor.web3.Keypair.generate();
    const NftTokenAccount = await getAssociatedTokenAddress(
      mintKey.publicKey,
      recipient
    );
    console.log('NFT Account: ', NftTokenAccount.toBase58());

    const mint_tx = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKey.publicKey,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
        lamports,
      }),
      createInitializeMintInstruction(
        mintKey.publicKey,
        0,
        wallet.publicKey,
        wallet.publicKey
      ),
      createAssociatedTokenAccountInstruction(
        wallet.publicKey,
        NftTokenAccount,
        wallet.publicKey,
        mintKey.publicKey
      )
    );

    const res = await program.provider.sendAndConfirm(mint_tx, [mintKey]);
    console.log(
      await program.provider.connection.getParsedAccountInfo(mintKey.publicKey)
    );

    console.log('Account: ', res);
    console.log('Mint key: ', mintKey.publicKey.toString());
    console.log('User: ', wallet.publicKey.toString());

    const metadataAddress = await getMetadata(mintKey.publicKey);
    const masterEdition = await getMasterEdition(mintKey.publicKey);

    console.log('Metadata address: ', metadataAddress.toBase58());
    console.log('MasterEdition: ', masterEdition.toBase58());

    const tx = await program.methods
      .mintNft(
        mintKey.publicKey,
        'SYMBL',
        'https://arweave.net/y5e5DJsiwH0s_ayfMwYk-SnrZtVZzHLQDSTZ5dNRUHA',
        'NFT Title'
      )
      .accounts({
        mintAuthority: wallet.publicKey,
        mint: mintKey.publicKey,
        tokenAccount: NftTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
        metadata: metadataAddress,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        payer: wallet.publicKey,
        systemProgram: SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        masterEdition: masterEdition,
      })
      .rpc();
    console.log('Your transaction signature', tx);
  });
  */
});
