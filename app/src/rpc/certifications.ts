import { web3, utils, BN } from '@coral-xyz/anchor';
import { getProgram } from './program';
import { getFilter } from './memcmpFilter';
import { PublicKey } from '@solana/web3.js';

export const getCertifications = async (
  wallet: any,
  connection: web3.Connection
) => {
  const program = getProgram(wallet, connection);
  const filter = getFilter(8, wallet.publicKey.toBase58());
  const certs = await program.account.certification.all(filter);

  return certs;
};

export const addCertification = async (
  wallet: any,
  connection: web3.Connection,
  id: string,
  title: string,
  maxEnrollees: number,
  endDate: number
) => {
  console.log('adding certification...');

  console.log('end date', endDate);

  const program = getProgram(wallet, connection);
  const [certificationPda, certBump] = await PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode('certification'),
      utils.bytes.utf8.encode(id),
      wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  console.log('certificationPda', certificationPda.toBase58());

  const tx = await program.methods
    .addCertification(id, title, maxEnrollees, new BN(endDate))
    .accounts({
      certification: certificationPda,
      user: wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();

  console.log('tx', tx);
  return tx;
};
