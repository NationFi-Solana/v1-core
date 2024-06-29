'use client';
import { createContext, ReactNode, useState, useContext } from 'react';

import * as anchor from '@coral-xyz/anchor';
import { useQuery } from '@tanstack/react-query';
import { useAnchorProvider } from '../solana/solana-provider';
import { getBetStatePDA } from '@/lib/utils/pda';
import { idl } from '../../target/idl/betting_dapp';
import { BettingDapp } from '../../target/types/betting_dapp';
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

export function getBettingProgram(provider: anchor.AnchorProvider) {
  idl.address = '5pTgM2iB8Huogi6m9PBSBQKT1Vpr7W8pTJpjstcQJ9TS';
  return new anchor.Program(idl as BettingDapp, provider);
}
export const ProgramProvider: React.FC<ProgramProviderProps> = ({
  children,
  _betId,
}) => {
  const [betId, setBetId] = useState<number>(_betId);

  const provider = useAnchorProvider();

  const program = getBettingProgram(provider);

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
