'use client';
import { useProgram } from '@/components/providers/program-provider';
import { BetForm } from './bet-form';
import { BetClaim } from './bet-claim';
import { PulseLoader } from 'react-spinners';
import { useWallet } from '@solana/wallet-adapter-react';

export default function BetCard({
  sluga,
  slugb,
}: {
  sluga: string | undefined;
  slugb: string | undefined;
}) {
  const { programData, isLoading } = useProgram();
  const { publicKey } = useWallet();

  return (
    <div className="min-w-[340px] max-w-[420px] xl:min-w-[420px]">
      <div className="bg-background-800 p-4 w-full rounded-md ">
        {' '}
        {!publicKey && (
          <div className="text-center">
            <h2 className="font-archivo font-medium">Connect Wallet</h2>
          </div>
        )}
        {publicKey && (
          <>
            {!programData && !isLoading && (
              <div>
                <h2 className="font-archivo font-bold text-lg text-center">
                  Betting is <span className="text-primary">not ready.</span>
                </h2>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-center py-4">
                <PulseLoader color="#F5B700" />
              </div>
            )}
            {programData?.betsClosed === 0 && programData.betOver === 0 && (
              <BetForm sluga={sluga} slugb={slugb} />
            )}
            {programData?.betsClosed === 1 && programData.betOver === 0 && (
              <div>
                <h2 className="font-archivo text-xl text-center">
                  Betting is closed.
                </h2>
              </div>
            )}
            {programData?.betsClosed === 1 && programData.betOver === 1 && (
              <BetClaim
                isBetAWinner={programData.isBetAWinner}
                totalSolA={programData.totalSolA.toNumber()}
                totalSolB={programData.totalSolB.toNumber()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// export function DevButtons() {
//   return  <button
//         onClick={() => {
//           program.methods.initializeProgramState().accounts({}).rpc();
//         }}
//       >
//         Init Program
//       </button>
//       <button
//         onClick={() => {
//           program.methods
//             .setProgramState(1, 1, 1)
//             .accounts({ programStateAccount: pda })
//             .rpc();
//         }}
//       >
//         Close bets
//       </button>

// }
