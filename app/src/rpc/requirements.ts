import { web3, utils } from '@coral-xyz/anchor';
import { getProgram } from './program';
import { getFilter } from './memcmpFilter';
import { PublicKey } from '@solana/web3.js';

interface AddRequirementArgs {
  wallet: any;
  connection: web3.Connection;
  certification: string;
  module: string;
  credits: number;
}

interface CompleteRequirementArgs {
  wallet: any;
  connection: web3.Connection;
  enrollment: string;
  requirement: string;
  certification: string;
}

export const getRequirements = async (
  wallet: any,
  connection: web3.Connection,
  certification: string
) => {
  const program = getProgram(wallet, connection);
  const filter = getFilter(8, new PublicKey(certification).toBase58());
  const reqs = await program.account.requirement.all(filter);

  return reqs;
};

export const addRequirement = async (args: AddRequirementArgs) => {
  console.log('adding requirement...');

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

  console.log('Account Created (Requirement)', tx);

  return { module: args.module, credits: args.credits };
};

export const completeRequirement = async (args: CompleteRequirementArgs) => {
  const program = getProgram(args.wallet, args.connection);

  console.log(args)

  const tx = await program.methods
    .completeRequirement()
    .accounts({
      authority: args.wallet.publicKey,
      enrollment: args.enrollment,
      requirement: args.requirement,
      certification: args.certification,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();

  console.log('Requirement Completed: ', tx);

  return tx;
};
