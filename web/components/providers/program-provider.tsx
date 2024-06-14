'use client';
import { createContext, ReactNode, useState, useContext } from 'react';

interface ProgramContextType {
  addressId: string;
  setProgramId: (id: string) => void;
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

  return (
    <ProgramContext.Provider value={{ addressId, setProgramId }}>
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
