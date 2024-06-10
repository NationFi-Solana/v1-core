'use client';
import { useConnection } from '@solana/wallet-adapter-react';
import { useCluster } from '../cluster/cluster-data-access';
import { useMemo } from 'react';
import { getBettingProgram, getBettingProgramId } from '@test/anchor';
import { useAnchorProvider } from '../solana/solana-provider';
import { useMutation } from '@tanstack/react-query';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Address, BN } from '@coral-xyz/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';

export function useBetProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const provider = useAnchorProvider();
  const programId = useMemo(() => getBettingProgramId(), []);
  const program = getBettingProgram(provider, '');

  const placeBet = useMutation({
    mutationKey: ['a'],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .placeSplBet(0, new BN(1000), 9)
        .accounts({
          programStateAccount: deriveProgramStateAccountPda(programId),
          userSplBalance: '',
          userTokenAccount: '',
          splTokenMint: '',
          programTokenAccountForSpl: '',
          programAuthority: ''
        })
        .signers([keypair])
        .rpc(),
  });
  return {};
}


function deriveProgramStateAccountPda(programId: PublicKey) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pda] = findProgramAddressSync([Buffer.from('state')], programId)
  return pda;
}