import { web3 } from '@coral-xyz/anchor';
import { getProgram } from './program';
import { getFilter } from './memcmpFilter';

export const getCertifications = (wallet: any, connection: web3.Connection) => {
  const program = getProgram(wallet, connection);

  const filter = getFilter(8, wallet.publicKey.toBase58());

  return program.account.certification.all(filter);
};
