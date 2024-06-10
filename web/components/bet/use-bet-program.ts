'use client';

import { useConnection } from '@solana/wallet-adapter-react';
import { useCluster } from '../cluster/cluster-data-access';
import { useMemo } from 'react';
import { getBettingProgram, getBettingProgramId } from '@test/anchor';
import { useAnchorProvider } from '../solana/solana-provider';

export function useBetProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const provider = useAnchorProvider();
  const programId = useMemo(() => getBettingProgramId(), []);
  const program = getBettingProgram(provider);

  return {};
}
