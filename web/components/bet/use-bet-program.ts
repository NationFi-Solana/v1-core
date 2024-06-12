'use client';
import { useMemo } from 'react';
import { getBettingProgram, getBettingProgramId } from '@test/anchor';
import { useAnchorProvider } from '../solana/solana-provider';
import { useMutation } from '@tanstack/react-query';
import { BN } from '@coral-xyz/anchor';
import * as anchor from "@coral-xyz/anchor";
import { useWallet } from '@solana/wallet-adapter-react';
interface Props {
  isABet: boolean;
  amount: number
}

export function useSolBet({
  isABet,
  amount
}: Props) {
  const provider = useAnchorProvider();
  const programId = useMemo(() => getBettingProgramId(), []);
  const program = getBettingProgram(provider, '7t3Ao9DeLrYUrduk2Xa3EAF39NAYhSWGEqxPY98ShmUf');

  const [userSolBalanceBPda,] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("sol_bet_b")],
    programId
  );
  const [programStateAccount,] =
    anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("state")],
      programId
    );
  const wallet = useWallet()
  const placeSolBet = useMutation({
    mutationKey: ['placebet'],
    mutationFn: () => {
      if (wallet.publicKey) {

        return program.methods.placeSolBet(isABet ? 0 : 1, new BN(amount)).accounts({
          userSolBalance: userSolBalanceBPda,
          programStateAccount: programStateAccount,
          userAuthority: wallet.publicKey,

        }).signers([]).rpc()
      } else { throw Error("No wallet provided") }
    },
    onError: (e) => {
      console.log(e, "ERROR")
    },
    onSuccess: (s) => {
      console.log(s)
    }
  })
  return { placeSolBet, };
}


