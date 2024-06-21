import { Button } from '@/components/shared/ui/button';
import { useCollectWinnings } from '../hooks/use-bet-program';
import { FormEvent, useEffect } from 'react';
import { useGetUserPosition } from '../hooks/get-user-position';
import { checkNaN, formatDecimal, getUserReward } from '@/lib/utils/utils';
import { useProgram } from '@/components/providers/program-provider';
import { SiSolana } from 'react-icons/si';
import BetProgressAlert from '../bet-progress-alert';
import toast from 'react-hot-toast';
import Link from 'next/link';

export function BetClaim({
  isBetAWinner,
  totalSolA,
  totalSolB,
}: {
  isBetAWinner: number | undefined;
  totalSolA: number | undefined;
  totalSolB: number | undefined;
}) {
  const { cashOut } = useCollectWinnings({
    isBetA: isBetAWinner === 1,
  });
  const { betId } = useProgram();
  const submitCashout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cashOut.mutate();
  };
  const { data } = useGetUserPosition({
    isBetA: isBetAWinner === 1,
    id: betId,
  });
  const userReward = getUserReward(
    totalSolA ?? 0,
    totalSolB ?? 0,
    data?.balance.toNumber(),
    isBetAWinner === 1
  );

  useEffect(() => {
    if (cashOut.isSuccess && cashOut.data) {
      toast.success(
        <div className="">
          <h2>Success!</h2>
          <Link
            href={`https://solscan.io/tx/${cashOut.data}`}
            className="text-blue-400"
          >
            Transaction.
          </Link>
        </div>,
        { position: 'top-center' }
      );
    }
  }, [cashOut.data, cashOut.isSuccess]);
  console.log(userReward);
  return (
    <>
      <BetProgressAlert
        waitForSign={cashOut.isPending}
        isTxPending={cashOut.isPending}
      />
      <form onSubmit={submitCashout}>
        <h1 className="font-archivo font-bold text-center text-xl">Claim</h1>
        <div className="flex justify-between border-b border-background-500 pb-1">
          <h2 className="font-semibold">Position</h2>
          <h2 className="flex items-center gap-x-1">
            {formatDecimal(checkNaN(userReward) / 10 ** 9)}
            <SiSolana size={15} className="text-primary" />
          </h2>
        </div>

        <div className="pt-4"></div>
        <Button
          disabled={checkNaN(userReward) <= 0}
          variant="submit"
          type="submit"
        >
          Claim
        </Button>
      </form>
    </>
  );
}
