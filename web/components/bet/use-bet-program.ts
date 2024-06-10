'use client';

import { useConnection } from '@solana/wallet-adapter-react';
import { useCluster } from '../cluster/cluster-data-access';
import { useMemo } from 'react';
import { getBettingProgram, getBettingProgramId } from '@test/anchor';
import { useAnchorProvider } from '../solana/solana-provider';
import { useMutation } from '@tanstack/react-query';

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
        .placeSplBet()
        .accounts({ programAuthority: '' })
        .signers([keypair])
        .rpc(),
  });
  return {};
}
