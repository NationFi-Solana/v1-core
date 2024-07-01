'use client';

import { useMemo } from 'react';
import { useProgram } from '../providers/program-provider';
import { checkNaN, formatDecimal } from '@/lib/utils/utils';
import { SiSolana } from 'react-icons/si';

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
  console.log(totals, 'TOTALS');
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
              style={{ width: `${formatDecimal(checkNaN(totals.apercent))}%` }}
              className={`h-2 bg-primary `}
            ></div>
            <div
              style={{ width: `${formatDecimal(checkNaN(totals.bpercent))}%` }}
              className={`h-2  bg-primary-100 `}
            ></div>
            {checkNaN(totals.apercent) === 0 &&
              checkNaN(totals.bpercent) === 0 && (
                <div
                  style={{
                    width: `100%`,
                  }}
                  className={`h-2  bg-gray-400 `}
                ></div>
              )}
          </div>

          <div className="flex justify-between font-semibold pt-4 text-lg">
            <h3 className="flex gap-x-1 items-center">
              {formatDecimal(checkNaN(totals.a / 10 ** 9))}
              <SiSolana className="text-primary" />
            </h3>
            <h3 className="flex gap-x-1 items-center ">
              {formatDecimal(checkNaN(totals.b / 10 ** 9))}{' '}
              <SiSolana className="text-primary" />
            </h3>
          </div>
        </>
      )}
    </>
  );
}
