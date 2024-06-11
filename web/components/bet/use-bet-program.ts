'use client';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

import { useMemo } from 'react';
import { getBettingProgram, getBettingProgramId } from '@test/anchor';
import { useAnchorProvider } from '../solana/solana-provider';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { useCluster } from '../cluster/cluster-data-access';

import * as anchor from "@coral-xyz/anchor";


export function useBetProgram() {

  const wallet = useAnchorWallet()
  const provider = useAnchorProvider();
  const programId = useMemo(() => getBettingProgramId(), []);
  const program = getBettingProgram(provider, '7t3Ao9DeLrYUrduk2Xa3EAF39NAYhSWGEqxPY98ShmUf');
  const mint = new PublicKey('3yZEgJVK41MvLuWKvHh6bpaLwqynaQG7BYwB4bPdCnFj')
  const tokenAccountForMint = new PublicKey('C5r3YfGioRAziHonypJDpMG9qa94yLSN8qXwNjmcjwTs')

  const [userSolBalanceBPda,] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("sol_bet_b")],
    programId
  );



  const [programStateAccount,] =
    anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("state")],
      programId
    );

  const placeSolBet = useMutation({
    mutationKey: ['placebet'],
    mutationFn: () => {
      return program.methods.placeSolBet(0, new BN(1000)).accounts({
        userSolBalance: userSolBalanceBPda,
        programStateAccount: programStateAccount,
      }).signers([]).rpc()
    }
  })

  const placeSplBet = useMutation({
    mutationKey: ['placebet'],
    mutationFn: () => {
      // const ownerTokenAddress = token.associatedAddress({
      //   mint,
      //   owner: programId,
      // });

      // const [userSplBalancePda] = findProgramAddressSync([tokenAccountForMint.toBuffer(), Buffer.from('spl_bet_b')], programId)

      return program.methods
        .placeSplBet(0, new BN(1000), 9)
        .accounts({
          programStateAccount: deriveProgramStateAccountPda(programId),
          userSplBalance: '',
          userTokenAccount: tokenAccountForMint,
          splTokenMint: mint,
          programTokenAccountForSpl: '',
          userAuthority: wallet?.publicKey ?? '',
          programAuthority: programId
        })
        .signers([])
        .rpc()
    }
  });
  return { placeSolBet, placeSplBet };
}


function deriveProgramStateAccountPda(programId: PublicKey) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pda] = anchor.web3.PublicKey.findProgramAddressSync([Buffer.from('state')], programId)
  return pda;
}
