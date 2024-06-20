// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import CounterIDL from '../target/idl/counter.json';
import BettingIDL from '../target/idl/betting_dapp.json';
import type { Counter } from '../target/types/counter';
import { BettingDapp } from '../target/types/betting_dapp';

// Re-export the generated IDL and type
export { Counter, CounterIDL };

// The programId is imported from the program IDL.
export const COUNTER_PROGRAM_ID = new PublicKey(CounterIDL.address);

// This is a helper function to get the Counter Anchor program.
export function getCounterProgram(provider: AnchorProvider) {
  return new Program(CounterIDL as Counter, provider);
}
// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getCounterProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('6TeDLuCyB49xAf9781LxaBc3HPUHgPwvAzBVmQ8KyyaR');
    case 'mainnet-beta':
    default:
      return COUNTER_PROGRAM_ID;
  }
}

export function getBettingProgram(provider: AnchorProvider) {
  const idl = {
    ...BettingIDL,
    address: 'GmCTPLF5y9LMUpiLkoTusrocEFsKdJp48aXcAiGRrJB1',
  };
  return new Program(idl as BettingDapp, provider);
}

export const BETTING_PROGRAM_ID = new PublicKey(CounterIDL.address);
export function getBettingProgramId() {
  return BETTING_PROGRAM_ID;
}
