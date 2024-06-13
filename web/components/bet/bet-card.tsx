'use client';
import { type FormEvent, useState, useCallback } from 'react';
import { Button } from '../shared/ui/button';
import Stats from './stats';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { SiSolana } from 'react-icons/si';
import { useSolBet } from './use-bet-program';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useSubmitValid } from './hooks/isSubmitValid';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

export default function BetCard({
  sluga,
  slugb,
}: {
  sluga: string | undefined;
  slugb: string | undefined;
}) {
  const [deposit, setDeposit] = useState('');
  const { connected } = useWallet();
  const searchParams = useSearchParams();
  const vote = searchParams.get('vote');
  const { placeSolBet, initProgram } = useSolBet({ isABet: true, amount: 333 });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // initProgram.mutate();
    placeSolBet.mutate();
  };
  const walletModal = useWalletModal();

  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const router = useRouter();
  const bal = useQuery({
    queryKey: ['solBal', publicKey],
    queryFn: async () => {
      if (publicKey) {
        const balance = await connection.getBalance(publicKey);
        return balance;
      } else {
        throw new Error('Not connected');
      }
    },
  });
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const pathname = usePathname();
  const { isValid, errorMessage } = useSubmitValid({
    deposit,
    balance: bal.data,
    vote,
  });
  return (
    <div className="min-w-[340px] max-w-[420px] xl:min-w-[420px]">
      <div className="bg-background-800 p-4 w-full rounded-md ">
        <form onSubmit={onSubmit} className="space-y-2">
          <div className="flex ">
            <label htmlFor="choice" className="text-center font-semibold">
              Choose Outcome{' '}
            </label>
          </div>

          <div className="flex gap-x-2">
            <Button
              role="checkbox"
              type="button"
              onClick={() => {
                router.push(
                  pathname +
                    '?' +
                    createQueryString('vote', sluga?.toLowerCase() ?? 'yes')
                );
              }}
              className={`basis-1/2 ${
                vote === sluga?.toLowerCase() && 'bg-primary text-black'
              } font-archivo`}
              variant="primary"
            >
              VOTE {sluga?.toUpperCase()}
            </Button>
            <Button
              type="button"
              role="checkbox"
              onClick={() => {
                router.push(
                  pathname +
                    '?' +
                    createQueryString('vote', slugb?.toLowerCase() ?? 'no')
                );
              }}
              className={`basis-1/2 ${
                vote === slugb?.toLowerCase() && 'bg-primary text-black'
              } font-archivo`}
              variant="primary"
            >
              VOTE {slugb?.toUpperCase()}
            </Button>
          </div>
          <div className="pt-1"></div>
          <div>
            <label htmlFor="amount" className="font-semibold">
              Enter Amount
            </label>
          </div>
          <input
            id="amount"
            className="w-full bg-background py-2 px-2 rounded-md border border-gray-600"
            placeholder="$0.00"
            type="text"
            minLength={1}
            step="any"
            pattern="^[0-9]*[.,]?[0-9]*$"
            autoComplete="off"
            inputMode="decimal"
            value={deposit}
            onChange={(e) => {
              const pattern = /^[0-9]*[.,]?[0-9]*$/;
              if (pattern.test(e.target.value))
                return setDeposit(e.target.value);
            }}
          />

          <div className="flex w-full justify-between  gap-x-2 text-sm">
            <h3 className="text-gray-500">Balance</h3>
            <h3 className="flex items-center gap-x-1">
              {bal.data ? bal.data / 10 ** 9 : '0'}{' '}
              <SiSolana className="text-primary"></SiSolana>
            </h3>
          </div>
          <div className="pt-1"></div>
          {connected && (
            <Button
              disabled={!isValid}
              type="submit"
              className={
                'flex justify-center disabled:cursor-not-allowed transition-colors duration-300' +
                ' cursor-pointer w-full text-white py-2 bg-gradient-to-r hover:bg-opacity-70 from-primary to-primary-100 hover:from-primary/60 hover:to-primary-100/30 to rounded-md   font-bold'
              }
            >
              BUY
            </Button>
          )}
          {!connected && (
            <Button
              onClick={() => walletModal.setVisible(true)}
              className="flex justify-center disabled:cursor-not-allowed transition-colors duration-300 cursor-pointer w-full text-white py-2 bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 from-cyan-500 to-blue-500 rounded-md   font-bold"
            >
              Connect
            </Button>
          )}

          {connected && <p className="text-red-400 text-sm">{errorMessage}</p>}
          <Stats />
        </form>
      </div>
    </div>
  );
}
