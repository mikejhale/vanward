import { web3 } from '@coral-xyz/anchor';
import { PublicKey, Keypair } from '@solana/web3.js';
import { Program, Wallet } from '@coral-xyz/anchor';
//import { Vanward } from '../target/types/vanward';
import {
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
  MINT_SIZE,
} from '@solana/spl-token'; // IGNORE THESE ERRORS IF ANY

export const mintNft = async (
  wallet: any,
  program: any,
  title: string,
  metadataUri: string,
  recipient: PublicKey
) => {
  console.log('wallet', wallet);
  console.log('program', program);
  console.log('title', title);
  console.log('metadataUri', metadataUri);
  console.log('recipient', recipient);

  const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );
  const lamports: number =
    await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE
    );
  const getMetadata = async (mint: PublicKey): Promise<PublicKey> => {
    return (
      await PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID
      )
    )[0];
  };

  const getMasterEdition = async (mint: web3.PublicKey): Promise<PublicKey> => {
    return (
      await PublicKey.findProgramAddressSync(
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

  const mintKey: web3.Keypair = await web3.Keypair.generate();

  console.log('mintkey', mintKey.publicKey.toString());
  const NftTokenAccount = await getAssociatedTokenAddress(
    mintKey.publicKey,
    recipient
  );
  console.log('NFT Account: ', NftTokenAccount.toBase58());

  const metadataAddress = await getMetadata(mintKey.publicKey);
  const masterEdition = await getMasterEdition(mintKey.publicKey);

  const tx = await program.methods
    .mintNft(mintKey.publicKey, '', metadataUri, title)
    .accounts({
      mintAuthority: wallet.publicKey,
      mint: mintKey.publicKey,
      tokenAccount: NftTokenAccount,
      tokenProgram: TOKEN_PROGRAM_ID,
      metadata: metadataAddress,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      payer: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
      rent: web3.SYSVAR_RENT_PUBKEY,
      masterEdition: masterEdition,
    })
    .signers([mintKey])
    .preInstructions([
      web3.SystemProgram.createAccount({
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
      ),
    ])
    .rpc();
  console.log('Your transaction signature', tx);
};
