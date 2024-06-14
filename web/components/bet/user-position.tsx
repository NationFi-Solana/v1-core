'use client';
import { FormEvent } from 'react';
import { Button } from '../shared/ui/button';
import { useGetUserPosition } from './hooks/get-user-position';
import { useCancelBet } from './hooks/use-bet-program';
import BetProgressAlert from './bet-progress-alert';
import { SiSolana } from 'react-icons/si';

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
  const bal0 = parseInt(data?.balance.toString() ?? '0') > 0;
  return (
    <form onSubmit={onSubmit}>
      <BetProgressAlert waitForSign={cashOut.isPending} isTxPending={false} />
      <div className="flex border-b border-gray-600 pb-2 items-center  justify-between">
        <h1 className="font-archivo ">{option}</h1>
        <div className="flex items-center gap-x-2">
          <h1 className="flex items-center gap-x-2 pr-4">
            {parseInt(data?.balance.toString() ?? '0') / 10 ** 9}{' '}
            <SiSolana size={15} className="text-primary" />
          </h1>

          <Button type="submit" disabled={!data || !bal0} variant="destructive">
            Withdraw
          </Button>
        </div>
      </div>
    </form>
  );
}
