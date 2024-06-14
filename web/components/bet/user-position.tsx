'use client';
import { FormEvent } from 'react';
import { Button } from '../shared/ui/button';
import { useGetUserPosition } from './hooks/get-user-position';
import { useCancelBet } from './hooks/use-bet-program';
import BetProgressAlert from './bet-progress-alert';

export function UserPosition({
  option,
  isBetA,
}: {
  option: string | undefined;
  isBetA: boolean;
}) {
  const { data } = useGetUserPosition({ isBetA });
  const { cashOut } = useCancelBet({ isBetA });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cashOut.mutate();
  };

  return (
    <form onSubmit={onSubmit}>
      <BetProgressAlert waitForSign={cashOut.isPending} isTxPending={false} />
      <div className="flex border-b border-gray-600 pb-1 items-center  justify-between">
        <h1 className="font-archivo ">{option}</h1>
        <div className="flex items-center gap-x-2">
          <h1 className="">{data?.balance.toString() ?? '0'} SOL</h1>

          <Button type="submit" disabled={!data} variant="destructive">
            Withdraw
          </Button>
        </div>
      </div>
    </form>
  );
}
