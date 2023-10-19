import { web3, utils, BN, ProgramAccount } from '@coral-xyz/anchor';
import { getProgram } from './program';
import { getFilter } from './memcmpFilter';
import { PublicKey } from '@solana/web3.js';

type addCertArgs = {
  wallet: any;
  connection: web3.Connection;
  id: string;
  title: string;
  maxEnrollees: number;
  endDate: number;
  nftUri: string;
};

export const getCertifications = async (
  wallet: any,
  connection: web3.Connection
) => {
  const program = getProgram(wallet, connection);
  const filter = getFilter(8, wallet.publicKey.toBase58());
  const certs = await program.account.certification.all(filter);

  return certs;
};

export const getCertification = async (
  wallet: any,
  connection: web3.Connection,
  certification: string
) => {
  const program = getProgram(wallet, connection);
  const cert = await program.account.certification.fetchNullable(certification);

  return cert;
};

export const addCertification = async (args: addCertArgs) => {
  console.log('adding certification...');

  const program = getProgram(args.wallet, args.connection);
  const [certificationPda] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode('certification'),
      utils.bytes.utf8.encode(args.id),
      args.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  const tx = await program.methods
    .addCertification(
      args.id,
      args.title,
      args.maxEnrollees,
      new BN(args.endDate),
      args.nftUri
    )
    .accounts({
      certification: certificationPda,
      user: args.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();

  return tx;
};
