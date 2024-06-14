'use client';

import * as anchor from '@coral-xyz/anchor';
import { useQuery } from '@tanstack/react-query';
import { useGetBetProgram } from '../shared/hooks/get-bet-program';
import { useMemo } from 'react';

export function BetPercents() {
  const { programId, program } = useGetBetProgram();
  const [statePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from('state')],
    programId
  );
  const { data } = useQuery({
    queryKey: ['abPools', programId],
    queryFn: () => {
      return program.account.programState.fetch(statePda);
    },
  });
  const totals = useMemo(() => {
    const a = parseInt(data?.totalSolA.toString() ?? '0');
    const b = parseInt(data?.totalSolB.toString() ?? '0');
    const total = a + b;
    const apercent = (a / total) * 100;
    const bpercent = (b / total) * 100;
    return { a, b, apercent, bpercent };
  }, [data]);
  console.log(totals, 'TOTALS');
  return (
    <>
      <div className="flex ">
        <div
          style={{ width: `${totals.apercent}%` }}
          className={`h-2 bg-primary `}
        ></div>
        <div
          style={{ width: `${totals.bpercent}%` }}
          className={`h-2  bg-primary-100 `}
        ></div>
      </div>

      <div className="flex justify-between font-semibold pt-4 text-lg">
        <h3>{totals.apercent}%</h3>
        <h3>{totals.bpercent}%</h3>
      </div>
    </>
  );
}
