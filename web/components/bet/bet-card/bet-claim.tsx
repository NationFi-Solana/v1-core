import { Button } from '@/components/shared/ui/button';
import { useCollectWinnings } from '../hooks/use-bet-program';
import { FormEvent } from 'react';
import { useGetUserPosition } from '../hooks/get-user-position';
import { BN } from '@coral-xyz/anchor';
import { getUserReward } from '@/lib/utils';

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
  const submitCashout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cashOut.mutate();
  };
  const { data } = useGetUserPosition({ isBetA: isBetAWinner === 1 });
  const userReward = getUserReward(
    totalSolA ?? 0,
    totalSolB ?? 0,
    data?.balance.toNumber(),
    isBetAWinner === 1
  );
  return (
    <>
      <form onSubmit={submitCashout}>
        <div className="flex justify-between">
          <h2>Position</h2>
          <h2>{userReward}</h2>
        </div>
        <h1 className="font-archivo text-xl  pb-4">Redeem</h1>
        <Button variant="submit" type="submit">
          Claim
        </Button>
      </form>
    </>
  );
}
