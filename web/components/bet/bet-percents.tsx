'use client';

import { useMemo } from 'react';
import { useProgram } from '../providers/program-provider';

export function BetPercents({
  optiona,
  optionb,
}: {
  optiona: string | undefined;
  optionb: string | undefined;
}) {
  const { programData } = useProgram();
  const totals = useMemo(() => {
    const a = parseInt(programData?.totalSolA.toString() ?? '0');
    const b = parseInt(programData?.totalSolB.toString() ?? '0');
    const total = a + b;
    const apercent = (a / total) * 100;
    const bpercent = (b / total) * 100;
    return { a, b, apercent, bpercent };
  }, [programData?.totalSolA, programData?.totalSolB]);
  return (
    <>
      {programData?.betOver === 1 && (
        <div className="py-4">
          <h1 className="py-4 font-archivo text-2xl border-gray-500 border-t border-b ">
            <span className=" text-green-400 text-xl">Winner: </span>
            {programData?.isBetAWinner ? optiona : optionb}{' '}
          </h1>
        </div>
      )}
      {programData?.betOver === 0 && (
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
      )}
    </>
  );
}
