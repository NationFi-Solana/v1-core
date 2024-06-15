'use client';
import { useProgram } from '@/components/providers/program-provider';
import { BetForm } from './bet-from';
import { Button } from '@/components/shared/ui/button';
import { useCollectWinnings } from '../hooks/use-bet-program';
import { FormEvent } from 'react';

export default function BetCard({
  sluga,
  slugb,
}: {
  sluga: string | undefined;
  slugb: string | undefined;
}) {
  const { programData } = useProgram();
  const { cashOut } = useCollectWinnings({
    isBetA: programData?.isBetAWinner === 1,
  });
  const submitCashout = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cashOut.mutate();
  };
  console.log(programData, 'DATA');
  if (!programData?.isInitialized) {
    return <></>;
  }
  return (
    <div className="min-w-[340px] max-w-[420px] xl:min-w-[420px]">
      <div className="bg-background-800 p-4 w-full rounded-md ">
        {programData?.betsClosed === 0 && programData.betOver === 0 && (
          <BetForm sluga={sluga} slugb={slugb} />
        )}
        {programData?.betsClosed === 1 && programData.betOver === 0 && (
          <h1>Betting is closed.</h1>
        )}
        {programData?.betsClosed === 1 && programData.betOver === 1 && (
          <form onSubmit={submitCashout}>
            <h1 className="font-archivo text-xl  pb-4">Redeem</h1>
            <Button variant="submit" type="submit">
              Claim
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
