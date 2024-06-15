'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BN } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useGetBetProgram } from '@/components/shared/hooks/get-bet-program';

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
  console.log(amount, 'AMOUNT');
  const wallet = useWallet();
  const { userSolBalancePda } = getSolPDA({
    isBetA,
    programId,
    user: wallet.publicKey,
  });

  const initProgram = useMutation({
    mutationKey: [''],
    mutationFn: () => {
      return program.methods.initPlaceSolBetB().accounts({}).rpc();
    },
  });
  const { data } = useQuery({
    queryKey: [
      'isInit',
      { publicKey: wallet.publicKey, programId: programId, isBetA },
    ],
    queryFn: () => {
      return program.account.signerSolBalance.fetch(userSolBalancePda);
    },
  });
  const queryClient = useQueryClient();
  const placeSolBet = useMutation({
    mutationKey: ['placebet'],
    mutationFn: async () => {
      if (wallet.publicKey) {
        if (data) {
          return program.methods
            .placeSolBet(getBetNum({ isBetA }), new BN(amount * 10 ** 9))
            .accounts({
              userSolBalance: userSolBalancePda,
            })
            .signers([])
            .rpc();
        } else {
          if (isBetA) {
            return await program.methods
              .placeSolBet(getBetNum({ isBetA }), new BN(amount * 10 ** 9))
              .accounts({ userSolBalance: userSolBalancePda })
              .preInstructions([
                await program.methods.initPlaceSolBetA().instruction(),
              ])
              .rpc();
          } else {
            return await program.methods
              .placeSolBet(getBetNum({ isBetA }), new BN(amount * 10 ** 9))
              .accounts({ userSolBalance: userSolBalancePda })
              .preInstructions([
                await program.methods.initPlaceSolBetB().instruction(),
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
    },
  });
  return { placeSolBet, initProgram, isInit: Boolean(data) };
}

export function useCancelBet({ isBetA }: { isBetA: boolean }) {
  const wallet = useWallet();
  const { program, programId } = useGetBetProgram();

  const { userSolBalancePda } = getSolPDA({
    isBetA,
    programId,
    user: wallet.publicKey,
  });
  const queryClient = useQueryClient();
  const cashOut = useMutation({
    mutationKey: [''],
    mutationFn: () => {
      if (wallet.publicKey) {
        return program.methods
          .cashoutBet(getBetNum({ isBetA }))
          .accounts({ userSolBalance: userSolBalancePda })
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
  const cashOut = useMutation({
    mutationKey: [''],
    mutationFn: () => {
      if (wallet.publicKey) {
        return program.methods
          .cashoutWinnings(getBetNum({ isBetA }))
          .accounts({ userSolBalance: userSolBalancePda })
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
