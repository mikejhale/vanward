import { web3, utils, BN } from '@coral-xyz/anchor';
import { getProgram } from './program';
import { getFilter } from './memcmpFilter';
import { PublicKey } from '@solana/web3.js';

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

export const addRequirement = async (
  wallet: any,
  connection: web3.Connection,
  certification: string,
  module: string,
  credits: number
) => {
  console.log('adding requirement...');

  console.log('wallet', wallet);
  console.log('connection', connection);
  console.log('certification', certification);
  console.log('module', module);
  console.log('credits', credits);

  const program = getProgram(wallet, connection);

  const [requirementPda, reqBump] = await PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode('requirement'),
      utils.bytes.utf8.encode(module),
      wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  const tx = await program.methods
    .addRequirement(module, credits)
    .accounts({
      requirement: requirementPda,
      certification: new PublicKey(certification),
      authority: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();

  console.log('Account Created (Requirement)', tx);

  return tx;
};
