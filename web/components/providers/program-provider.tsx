'use client';
import { createContext, ReactNode, useState, useContext, useMemo } from 'react';

import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { useQuery } from '@tanstack/react-query';
import { useAnchorProvider } from '../solana/solana-provider';
import { getBettingProgram } from '@test/anchor';
interface ProgramContextType {
  addressId: string;
  setProgramId: (id: string) => void;

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
  programId: string;
}

export const ProgramProvider: React.FC<ProgramProviderProps> = ({
  children,
  programId,
}) => {
  const [addressId, setProgramId] = useState<string>(programId);
  const [statePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('state')],
    new PublicKey(programId)
  );

  const provider = useAnchorProvider();
  const program = useMemo(() => {
    return getBettingProgram(provider, addressId);
  }, [addressId, provider]);
  const { data } = useQuery({
    queryKey: ['abPools', programId],
    queryFn: () => {
      return program.account.programState.fetch(statePda);
    },
  });
  return (
    <ProgramContext.Provider
      value={{ addressId, setProgramId, programData: data }}
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
