import { web3, utils } from '@coral-xyz/anchor';
import { getProgram } from './program';
import { getFilter } from './memcmpFilter';
import { PublicKey } from '@solana/web3.js';

interface requirementArgs {
  wallet: any;
  connection: web3.Connection;
  certification: string;
  module: string;
  credits: number;
}

export const getEnrollees = async (
  wallet: any,
  connection: web3.Connection,
  certification: string
) => {
  const program = getProgram(wallet, connection);
  const filter = getFilter(8 + 64, new PublicKey(certification).toBase58());
  const enrollments = await program.account.enrollment.all(filter);

  return enrollments;
};

export const getEnrollment = async (
  wallet: any,
  connection: web3.Connection,
  enrollment: string
) => {
  const program = getProgram(wallet, connection);
  const enrollmentAcct = await program.account.enrollment.fetchNullable(
    enrollment
  );

  return enrollmentAcct;
};

export const addEnrollee = async (args: requirementArgs) => {
  const program = getProgram(args.wallet, args.connection);

  const [requirementPda] = await PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode('requirement'),
      utils.bytes.utf8.encode(args.module),
      args.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  const tx = await program.methods
    .addRequirement(args.module, args.credits)
    .accounts({
      requirement: requirementPda,
      certification: new PublicKey(args.certification),
      authority: args.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();

  return { module: args.module, credits: args.credits };
};
