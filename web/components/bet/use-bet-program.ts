'use client';

import { getBettingProgram, } from '@test/anchor';
import { useAnchorProvider } from '../solana/solana-provider';
import { useMutation } from '@tanstack/react-query';
import { BN } from '@coral-xyz/anchor';
import * as anchor from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
interface Props {
  isABet: boolean;
  amount: number;
}

export function useSolBet({ isABet, amount }: Props) {
  const provider = useAnchorProvider();
  const addr = 'EsLLsztAmMrXdmGv7hRjdp2MdtSStEErGakmwrLretXQ';
  // const programId = useMemo(() => getBettingProgramId(), []);
  const programId = new PublicKey(addr);
  const program = getBettingProgram(provider, addr);

  const [userSolBalanceBPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('sol_bet_b')],
    programId
  );
  const [programStateAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('state')],
    programId
  );
  const wallet = useWallet();
  const initProgram = useMutation({
    mutationKey: [''],
    mutationFn: () => {
      return program.methods.initPlaceSolBetB().accounts({}).rpc();
    },
  });
  const placeSolBet = useMutation({
    mutationKey: ['placebet'],
    mutationFn: () => {
      if (wallet.publicKey) {
        return program.methods
          .placeSolBet(0, new BN(1))
          .accounts({
            userSolBalance: userSolBalanceBPda,
            programStateAccount: programStateAccount,
            // userAuthority: wallet.publicKey,
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
  return { placeSolBet, initProgram };
}
