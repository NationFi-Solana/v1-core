import { useGetBetProgram } from '@/components/shared/hooks/get-bet-program';
import { useQuery } from '@tanstack/react-query';
import { getSolPDA } from './use-bet-program';
import { useWallet } from '@solana/wallet-adapter-react';

export function useGetUserPosition({ isBetA }: { isBetA: boolean }) {
  const { program, programId } = useGetBetProgram();
  const wallet = useWallet();
  const { userSolBalancePda } = getSolPDA({
    isBetA,
    user: wallet.publicKey,
    programId,
  });
  const { data } = useQuery({
    queryKey: [
      'userPosition',
      wallet.publicKey,
      programId.toString(),
      isBetA ? '0' : '1',
    ],
    queryFn: async () => {
      if (wallet.publicKey !== null) {
        const balance = await program.account.signerSolBalance.fetch(
          userSolBalancePda
        );
        console.log(balance, 'BALANCE');
        return balance;
      } else {
        console.log('ERROR');
        throw new Error('Not connected');
      }
    },
  });

  return {
    data,
  };
}
