'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BN } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useGetBetProgram } from '@/components/shared/hooks/get-bet-program';
import { convertToU8Array } from '@/lib/utils/utils';
import { getBetFundsPDA, getBetStatePDA, getUserSolPDA } from '@/lib/utils/pda';
import { useProgram } from '@/components/providers/program-provider';

interface Props {
  isBetA: boolean;
  amount: number;
}
export function getSolPDA({
  isBetA,
  user,
  programId,
}: {
  isBetA: boolean;
  user: PublicKey | null;
  programId: PublicKey;
}) {
  const [userSolBalancePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from(isBetA ? 'sol_bet_a' : 'sol_bet_b'),
      user?.toBuffer() ?? Buffer.from(''),
    ],
    programId
  );
  return { userSolBalancePda };
}

export function useSolBet({ isBetA, amount }: Props) {
  const { program, programId } = useGetBetProgram();
  const wallet = useWallet();

  const { betId } = useProgram()
  const userSolBalancePda = getUserSolPDA({ id: betId, programId, isBetA, user: wallet.publicKey })

  const { BetStatePDA } = getBetStatePDA({ id: betId, programId })

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
    onSuccess: () => {
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

      const [statePda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('state')],
        new PublicKey(programId)
      );
      queryClient.invalidateQueries({
        queryKey: ['abPools', programId, statePda]
      })
    },
  });
  return { placeSolBet, isInit: Boolean(data) };
}

export function useCancelBet({ isBetA }: { isBetA: boolean }) {
  const wallet = useWallet();
  const { program, programId } = useGetBetProgram();
  const { betId } = useProgram()
  const { userSolBalancePda } = getSolPDA({
    isBetA,
    programId,
    user: wallet.publicKey,
  });
  const queryClient = useQueryClient();
  const cashOut = useMutation({
    mutationKey: ['cashout', betId.toString()],
    mutationFn: () => {
      if (wallet.publicKey) {
        const { BetStatePDA } = getBetStatePDA({ id: betId, programId })
        const { BetFundsPDA } = getBetFundsPDA({ id: betId, programId })
        return program.methods
          .cashoutBet(getBetNum({ isBetA }))
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
    onSuccess: () => {
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
    },
  });
  return { cashOut };
}

export function useCollectWinnings({ isBetA }: { isBetA: boolean }) {
  const wallet = useWallet();
  const { program, programId } = useGetBetProgram();
  const { userSolBalancePda } = getSolPDA({
    user: wallet.publicKey,
    programId,
    isBetA,
  });
  const { betId } = useProgram()
  const cashOut = useMutation({
    mutationKey: ['cashout', betId.toString()],
    mutationFn: () => {
      if (wallet.publicKey) {

        const { BetStatePDA } = getBetStatePDA({ id: betId, programId })
        const { BetFundsPDA } = getBetFundsPDA({ id: betId, programId })
        return program.methods
          .cashoutWinnings(getBetNum({ isBetA }))
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
    onSuccess: (s) => {
      console.log(s);
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
