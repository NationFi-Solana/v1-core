'use client';
import { FormEvent, useMemo } from 'react';
import { useGetUserPosition } from './hooks/get-user-position';

import { SiSolana } from 'react-icons/si';
import { checkNaN, formatDecimal } from '@/lib/utils/utils';
import { useProgram } from '../providers/program-provider';

export function UserPosition({
  option,
  isBetA,
  id,
}: {
  option: string | undefined;
  isBetA: boolean;
  id: number;
}) {
  const { data } = useGetUserPosition({ isBetA, id });
  // const { cashOut } = useCancelBet({ isBetA });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // cashOut.mutate();
  };

  // const bal0 = parseInt(data?.balance.toString() ?? '0') > 0;
  const { programData } = useProgram();
  const userPercent = useMemo(() => {
    const total = parseInt(
      isBetA
        ? programData?.totalSolA.toString()
        : programData?.totalSolB.toString()
    );
    if (!(total > 0)) {
      return 0;
    }
    const fee = (total * 5) / 100;
    const userBal = parseInt(data?.balance ?? '0');

    if (userBal > 0) {
      const result = (userBal * 100) / (total - fee);
      return result;
    } else {
      return 0;
    }
  }, [data?.balance, isBetA, programData?.totalSolA, programData?.totalSolB]);

  return (
    <form onSubmit={onSubmit}>
      <div className=" border-b border-gray-600 pb-2 ">
        <h1 className="font-archivo ">{option}</h1>
        <div className="flex flex-col gap-y-2 pt-2">
          <div className="flex justify-between w-full pr-2">
            <h2 className="text-gray-300 text-[16px]">Amount</h2>
            <h1 className="flex items-center gap-x-2 ">
              {formatDecimal(
                checkNaN(parseInt(data?.balance.toString() ?? '0') / 10 ** 9),
                5
              )}
              <SiSolana size={15} className="text-primary" />
            </h1>
          </div>

          <div className="flex justify-between">
            <h2>Percent of Share</h2>
            <h2>{userPercent.toString()}%</h2>
          </div>
        </div>
      </div>
    </form>
  );
}
