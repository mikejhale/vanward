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

export const getRequirements = async (
  wallet: any,
  connection: web3.Connection,
  certification: string
) => {
  console.log('reqs rpc: certification', certification);
  const program = getProgram(wallet, connection);
  const filter = getFilter(8, new PublicKey(certification).toBase58());
  const reqs = await program.account.requirement.all(filter);

  return reqs;
};

export const addRequirement = async (args: requirementArgs) => {
  console.log('adding requirement...');

  console.log('wallet', args.wallet);
  console.log('connection', args.connection);
  console.log('certification', args.certification);
  console.log('module', args.module);
  console.log('credits', args.credits);

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
