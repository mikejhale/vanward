import { PublicKey } from '@solana/web3.js';

export type Certification = {
  authority: PublicKey;
  bump: number;
  id: string;
  title: string;
  year: number;
};
