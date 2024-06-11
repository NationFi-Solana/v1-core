'use client';
import { type FormEvent, useState } from 'react';
import { Button } from '../shared/ui/button';
import Stats from './stats';
import { useWallet } from '@solana/wallet-adapter-react';
import { SiSolana } from 'react-icons/si';
import { useBetProgram } from './use-bet-program';

export default function BetCard() {
  const [selection, setSelection] = useState<number | undefined>();

  const { connected } = useWallet();

  const { placeBet } = useBetProgram();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    placeBet.mutate();
  };

  return (
    <div className="min-w-[340px] max-w-[420px] xl:min-w-[420px]">
      <div className="bg-background-900 p-4 w-full rounded-md ">
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="flex ">
            <label htmlFor="choice" className=" text-center">
              Outcome{' '}
            </label>
          </div>

          <div className="flex gap-x-2">
            <Button
              role="checkbox"
              onClick={() => {
                setSelection(0);
              }}
              className={`basis-1/2 ${
                selection === 0 && 'bg-cyan-400 text-black'
              }`}
              variant="cyan"
            >
              Vote Yes
            </Button>
            <Button
              role="checkbox"
              onClick={() => {
                setSelection(1);
              }}
              className={`basis-1/2 ${
                selection === 1 && 'bg-cyan-400 text-black'
              }`}
              variant="cyan"
            >
              Vote No
            </Button>
          </div>
          <div className="pt-1"></div>
          <div>
            <label htmlFor="amount" className="">
              Amount
            </label>
          </div>
          <input
            id="amount"
            className="w-full bg-background py-2 px-2 rounded-md border border-gray-600"
            placeholder="$0.00"
            type="number"
            min="-1"
          />

          <div className="flex w-full justify-between  gap-x-2 text-sm">
            <h3 className="text-gray-500">Balance</h3>
            <h3 className="flex items-center gap-x-1">
              20 <SiSolana className="text-cyan-400"></SiSolana>
            </h3>
          </div>
          <div className="pt-1"></div>
          <Button
            disabled={!connected}
            type="submit"
            className="flex justify-center disabled:cursor-not-allowed transition-colors duration-300 cursor-pointer w-full text-white py-2 bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 from-cyan-500 to-blue-500 rounded-md   font-bold"
          >
            BUY
          </Button>
          <Stats />
        </form>
      </div>
    </div>
  );
}
