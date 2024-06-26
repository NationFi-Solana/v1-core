'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BN } from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { useGetBetProgram } from '@/components/shared/hooks/get-bet-program';
import { convertToU8Array } from '@/lib/utils/utils';
import { getBetFundsPDA, getBetStatePDA, getUserSolPDA } from '@/lib/utils/pda';
import { useProgram } from '@/components/providers/program-provider';

interface Props {
  isBetA: boolean;
  amount: number;
}

export function useSolBet({ isBetA, amount }: Props) {
  const { program, programId } = useGetBetProgram();
  const wallet = useWallet();

  const { betId } = useProgram()
  const userSolBalancePda = getUserSolPDA({ id: betId, programId, isBetA, user: wallet.publicKey })

  const { BetStatePDA } = getBetStatePDA({ id: betId, programId })
  console.log(BetStatePDA.toString())
  const { data } = useQuery({
    queryKey: [
      'isInit',
      { publicKey: wallet.publicKey, programId: programId, isBetA },
    ],
    queryFn: () => {
      return program.account.signerSolBalance.fetch(userSolBalancePda);
    },
  });
  console.log({ data })
  const queryClient = useQueryClient();
  const placeSolBet = useMutation({
    mutationKey: ['placebet'],
    mutationFn: async () => {
      if (wallet.publicKey) {
        if (data) {
          return program.methods
            .placeSolBet(getBetNum({ isBetA }), new BN(amount * 10 ** 9), convertToU8Array(betId))
            .accounts({
              userSolBalance: userSolBalancePda,
              programStateAccount: BetStatePDA
            })
            .signers([])
            .rpc();
        } else {
          if (isBetA) {
            return await program.methods
              .placeSolBet(getBetNum({ isBetA }), new BN(amount * 10 ** 9), convertToU8Array(betId))
              // .initPlaceSolBetA()
              .accounts({
                userSolBalance: userSolBalancePda,
                programStateAccount: BetStatePDA
              })
              .preInstructions([
                await program.methods.initPlaceSolBetA().accounts({ programStateAccount: BetStatePDA }).instruction(),
              ])
              .rpc();
          } else {
            return await program.methods
              .placeSolBet(getBetNum({ isBetA }), new BN(amount * 10 ** 9), convertToU8Array(betId))
              .accounts({
                userSolBalance: userSolBalancePda,
                programStateAccount: BetStatePDA
              })
              .preInstructions([
                await program.methods.initPlaceSolBetB().accounts({ programStateAccount: BetStatePDA }).instruction(),
              ])
              .rpc();
          }
        }
      } else {
        throw Error('No wallet provided');
      }
    },
    onError: (e) => {
      console.log(e, 'ERROR');
    },
    onSuccess: (s) => {
      queryClient.invalidateQueries({
        queryKey: [
          'userPosition',
          wallet.publicKey,
          programId.toString(),
          isBetA ? '0' : '1',
        ],
      });
      queryClient.invalidateQueries({
        queryKey: ['solBal', wallet.publicKey?.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ['abPools', betId]
      })

    },
  });
  return { placeSolBet, isInit: Boolean(data) };
}

export function useCollectWinnings({ isBetA }: { isBetA: boolean }) {
  const wallet = useWallet();
  const queryClient = useQueryClient()
  const { program, programId } = useGetBetProgram();
  const { betId } = useProgram()
  const userSolBalancePda = getUserSolPDA({
    user: wallet.publicKey,
    programId,
    id: betId,
    isBetA,
  });
  const cashOut = useMutation({
    mutationKey: ['cashout', betId.toString()],
    mutationFn: () => {
      if (wallet.publicKey) {
        const { BetStatePDA } = getBetStatePDA({ id: betId, programId })
        const { BetFundsPDA } = getBetFundsPDA({ id: betId, programId })
        console.log(BetFundsPDA.toString(), BetStatePDA.toString())
        return program.methods
          .cashoutWinnings(getBetNum({ isBetA }), betId)
          .accounts({

            userSolBalance: userSolBalancePda,
            programStateAccount: BetStatePDA,
            programFundsAccount: BetFundsPDA
          })
          .signers([])
          .rpc();
      } else {
        throw Error('No wallet provided');
      }
    },
    onError: (e) => {
      console.log(e, 'ERROR');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'userPosition',
          wallet.publicKey,
          programId.toString(),
          isBetA ? '0' : '1',
        ]
      })

      // ['abPools', betId]
    },
  });
  return { cashOut };
}

export function getBetNum({ isBetA }: { isBetA: boolean }) {
  if (isBetA) {
    return 1;
  } else {
    return 0;
  }
}
