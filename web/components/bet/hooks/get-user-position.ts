import { useGetBetProgram } from '@/components/shared/hooks/get-bet-program';
import { useQuery } from '@tanstack/react-query';
import { useWallet } from '@solana/wallet-adapter-react';
import { getUserSolPDA } from '@/lib/utils/pda';

export function useGetUserPosition({ isBetA, id }: { isBetA: boolean, id: number }) {
  const { program, programId } = useGetBetProgram();
  const wallet = useWallet();
  const userSolBalancePda = getUserSolPDA({ id, user: wallet.publicKey, programId, isBetA })
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
        console.log(balance.toString(), "BALANCE")
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
