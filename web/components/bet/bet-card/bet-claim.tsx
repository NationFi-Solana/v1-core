import { Button } from '@/components/shared/ui/button';
import { useCollectWinnings } from '../hooks/use-bet-program';
import { FormEvent } from 'react';
import { useGetUserPosition } from '../hooks/get-user-position';
import { checkNaN, getUserReward } from '@/lib/utils/utils';
import { useProgram } from '@/components/providers/program-provider';
import { SiSolana } from 'react-icons/si';

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

  return (
    <>
      <form onSubmit={submitCashout}>
        <h1 className="font-archivo font-bold text-center text-xl">Claim</h1>
        <div className="flex justify-between border-b border-background-500 pb-1">
          <h2 className="font-semibold">Position</h2>
          <h2 className="flex items-center gap-x-1">
            {checkNaN(userReward) / 10 ** 9}
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
