'use client';
import { Button } from '../shared/ui/button';
import { useGetUserPosition } from './hooks/get-user-position';

export function UserPosition({
  option,
  isBetA,
}: {
  option: string | undefined;
  isBetA: boolean;
}) {
  const { data } = useGetUserPosition({ isBetA });
  return (
    <div className="flex border-b border-gray-600 pb-1 items-center  justify-between">
      <h1 className="font-archivo ">{option}</h1>
      <div className="flex items-center gap-x-2">
        <h1 className="">{data?.balance.toString() ?? '0'} SOL</h1>

        <Button disabled={!data} variant="destructive">
          Withdraw
        </Button>
      </div>
    </div>
  );
}
