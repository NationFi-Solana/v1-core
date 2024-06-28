'use client';
import { Button } from '@/components/shared/ui/button';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useSubmitValid } from '../hooks/is-submit-valid';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useQuery } from '@tanstack/react-query';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import BetProgressAlert from '../bet-progress-alert';
import { useSolBet } from '../hooks/use-bet-program';
import { SiSolana } from 'react-icons/si';
import Stats from '../stats';
import { checkNaN, formatDecimal } from '@/lib/utils/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

export function BetForm({
  sluga,
  slugb,
}: {
  sluga: string | undefined;
  slugb: string | undefined;
}) {
  const router = useRouter();

  const [deposit, setDeposit] = useState('');
  const { connected } = useWallet();
  const searchParams = useSearchParams();
  const vote = searchParams.get('vote');
  const { placeSolBet } = useSolBet({
    isBetA: vote?.toLowerCase() === sluga?.toLowerCase(),
    amount: parseFloat(deposit),
  });
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // initProgram.mutate();
    placeSolBet.mutate();
  };
  const walletModal = useWalletModal();
  useEffect(() => {
    if (placeSolBet.isSuccess && placeSolBet.data) {
      toast.success(
        <div className="">
          <h2>Success!</h2>
          <Link
            href={`https://solscan.io/tx/${placeSolBet.data}`}
            className="text-blue-400"
          >
            Transaction.
          </Link>
        </div>,
        { position: 'top-center' }
      );
    }
  }, [placeSolBet.data, placeSolBet.isSuccess]);
  useEffect(() => {
    if (placeSolBet.error) {
      toast.success(
        <div className="">
          <h2>Transaction Error!</h2>
        </div>,
        { position: 'top-center' }
      );
    }
  }, [placeSolBet.error]);
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const bal = useQuery({
    queryKey: ['solBal', publicKey?.toString()],
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
    <form onSubmit={onSubmit} className="space-y-2">
      <BetProgressAlert
        waitForSign={placeSolBet.isPending}
        isTxPending={false}
      ></BetProgressAlert>
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
                createQueryString('vote', sluga?.toLowerCase() ?? 'yes'),
              { scroll: false }
            );
          }}
          className={`basis-1/2 ${
            vote === sluga?.toLowerCase() && 'bg-primary text-black'
          } font-archivo`}
          variant="primary"
        >
          {sluga?.toUpperCase()}
        </Button>
        <Button
          type="button"
          role="checkbox"
          onClick={() => {
            router.push(
              pathname +
                '?' +
                createQueryString('vote', slugb?.toLowerCase() ?? 'no'),
              { scroll: false }
            );
          }}
          className={`basis-1/2 ${
            vote === slugb?.toLowerCase() && 'bg-primary text-black'
          } font-archivo`}
          variant="primary"
        >
          {slugb?.toUpperCase()}
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
        placeholder="0.00"
        type="text"
        minLength={1}
        step="any"
        pattern="^[0-9]*[.,]?[0-9]*$"
        autoComplete="off"
        inputMode="decimal"
        value={deposit}
        onChange={(e) => {
          const pattern = /^[0-9]*[.,]?[0-9]*$/;
          if (pattern.test(e.target.value)) return setDeposit(e.target.value);
        }}
      />
      <div className="flex w-full justify-between  gap-x-2 text-sm">
        <h3 className="text-gray-500">Balance</h3>
        <h3 className="flex items-center gap-x-1">
          {bal.data ? formatDecimal(checkNaN(bal.data / 10 ** 9)) : '0'}{' '}
          <SiSolana className="text-primary"></SiSolana>
        </h3>
      </div>
      <div className="pt-1"></div>
      {connected && (
        <Button disabled={!isValid} type="submit" variant="submit">
          <span className=" drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)]  text-lg">
            BUY
          </span>
        </Button>
      )}
      {!connected && (
        <Button
          onClick={() => walletModal.setVisible(true)}
          variant="submit"
          type="button"
        >
          <span className="">CONNECT</span>
        </Button>
      )}
      {connected && <p className="text-red-400 text-sm">{errorMessage}</p>}
      <Stats />
    </form>
  );
}
