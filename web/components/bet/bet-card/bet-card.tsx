'use client';
import { useProgram } from '@/components/providers/program-provider';
import { BetForm } from './bet-from';
import { BetClaim } from './bet-claim';

export default function BetCard({
  sluga,
  slugb,
}: {
  sluga: string | undefined;
  slugb: string | undefined;
}) {
  const { programData } = useProgram();

  return (
    <div className="min-w-[340px] max-w-[420px] xl:min-w-[420px]">
      <div className="bg-background-800 p-4 w-full rounded-md ">
        {programData?.betsClosed === 0 && programData.betOver === 0 && (
          <BetForm sluga={sluga} slugb={slugb} />
        )}
        {programData?.betsClosed === 1 && programData.betOver === 0 && (
          <h1>Betting is closed.</h1>
        )}
        {programData?.betsClosed === 1 && programData.betOver === 1 && (
          <BetClaim
            isBetAWinner={programData.isBetAWinner}
            totalSolA={programData.totalSolA.toNumber()}
            totalSolB={programData.totalSolB.toNumber()}
          />
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
