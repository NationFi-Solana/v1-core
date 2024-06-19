'use client';
import { createContext, ReactNode, useState, useContext, useMemo } from 'react';

import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useAnchorProvider } from '../solana/solana-provider';
import { getBettingProgram } from '@test/anchor';
import { getBetStatePDA } from '@/lib/utils/pda';
import { useGetBetProgram } from '../shared/hooks/get-bet-program';

interface ProgramContextType {
  betId: number;
  setBetId: (id: number) => void;
  isLoading: boolean;
  programData:
    | {
        betsClosed: number;
        isBetAWinner: number;
        betOver: number;
        totalBets: anchor.BN;
        totalSolA: anchor.BN;
        totalSolB: anchor.BN;
        totalBetsA: anchor.BN;
        totalBetsB: anchor.BN;
        isInitialized: number;
      }
    | undefined;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

interface ProgramProviderProps {
  children: ReactNode;
  _betId: number;
}

export const ProgramProvider: React.FC<ProgramProviderProps> = ({
  children,
  _betId,
}) => {
  const [betId, setBetId] = useState<number>(_betId);

  const provider = useAnchorProvider();
  const program = useMemo(() => {
    return getBettingProgram(provider);
  }, [provider]);
  const { BetStatePDA } = getBetStatePDA({
    id: betId,
    programId: program.programId,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['abPools', betId],
    queryFn: () => {
      return program.account.programState.fetch(BetStatePDA);
    },
  });
  console.log(isError, error);
  return (
    <ProgramContext.Provider
      value={{ betId, isLoading, setBetId, programData: data }}
    >
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgram = (): ProgramContextType => {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error('useProgram must be used within an ProgramProvider');
  }
  return context;
};
