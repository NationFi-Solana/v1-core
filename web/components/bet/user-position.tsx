'use client';
import { FormEvent } from 'react';
import { useGetUserPosition } from './hooks/get-user-position';

import { SiSolana } from 'react-icons/si';
import { checkNaN, formatDecimal } from '@/lib/utils/utils';

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
  // const { programData } = useProgram();
  return (
    <form onSubmit={onSubmit}>
      <div className="flex border-b border-gray-600 pb-2 items-center  justify-between">
        <h1 className="font-archivo ">{option}</h1>
        <div className="flex items-center gap-x-2">
          <h1 className="flex items-center gap-x-2 pr-4">
            {formatDecimal(
              checkNaN(parseInt(data?.balance.toString() ?? '0') / 10 ** 9)
            )}{' '}
            <SiSolana size={15} className="text-primary" />
          </h1>

          {/* {programData?.betOver == 0 && programData.betsClosed == 0 && (
            <Button
              type="submit"
              disabled={!data || !bal0}
              variant="destructive"
            >
              Withdraw
            </Button>
          )} */}
        </div>
      </div>
    </form>
  );
}
