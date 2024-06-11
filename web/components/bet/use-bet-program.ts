'use client';
import { useAnchorWallet } from '@solana/wallet-adapter-react';

import { useMemo } from 'react';
import { getBettingProgram, getBettingProgramId } from '@test/anchor';
import { useAnchorProvider } from '../solana/solana-provider';
import { useMutation } from '@tanstack/react-query';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey';
import { token } from '@coral-xyz/anchor/dist/cjs/utils';

export function useBetProgram() {

  const wallet = useAnchorWallet()
  const provider = useAnchorProvider();
  const programId = useMemo(() => getBettingProgramId(), []);
  const program = getBettingProgram(provider, '');
  const mint = new PublicKey('3yZEgJVK41MvLuWKvHh6bpaLwqynaQG7BYwB4bPdCnFj')
  const tokenAccountForMint = new PublicKey('C5r3YfGioRAziHonypJDpMG9qa94yLSN8qXwNjmcjwTs')

  const placeBet = useMutation({
    mutationKey: ['placebet'],
    mutationFn: () => {
      const ownerTokenAddress = token.associatedAddress({
        mint,
        owner: programId,
      });

      const [userSplBalancePda] = findProgramAddressSync([tokenAccountForMint.toBuffer(), Buffer.from('spl_bet_b')], programId)

      return program.methods
        .placeSplBet(0, new BN(1000), 9)
        .accounts({
          programStateAccount: deriveProgramStateAccountPda(programId),
          userSplBalance: userSplBalancePda,
          userTokenAccount: tokenAccountForMint,
          splTokenMint: mint,
          programTokenAccountForSpl: ownerTokenAddress,
          userAuthority: wallet?.publicKey ?? '',
          programAuthority: programId
        })
        .signers([])
        .rpc()
    }
  });
  return { placeBet };
}


function deriveProgramStateAccountPda(programId: PublicKey) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pda] = findProgramAddressSync([Buffer.from('state')], programId)
  return pda;
}
